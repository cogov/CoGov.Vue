// Dependencies
const express = require('express');
const connect = require('connect');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const fs = require('fs');
const AsyncRouter = require('express-async-router').AsyncRouter;

// Setup error logging for errors thrown in asnyc threads
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// intialize localization
const localizify = require('localizify');
localizify.add("en", require('./languages/en.json'));

// Initialize the Express App
var app = express();

// output run mode
if (process.env.NODE_ENV === "production")
    console.log("\033[41m\033[1m\033[5m\033[97m ---> RUNNING IN PRODUCTION MODE! <--- \033[0m");
else
    console.log("RUNNING IN STAGING MODE")

// Connect to the DB
require('./db').connect();

// Configure session
app.use(session({
    secret: 'eee4c295-1234-4f40-b00c-46fa6a746a89',
    saveUninitialized: false,
    resave:true,
    store: new MongoStore({ url: process.env.DB_URL })
}));

// For parsing HTTP responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var router = AsyncRouter();

if (process.env.NODE_ENV === "production")
{
}
else
{
    app.get('*', function (req, res) { handleRequest("get", req, res); });
    app.post('*', function (req, res) { handleRequest("post", req, res); });
}

const handleRequest = async (type, req, res) => {

    try {
        const lang = localizify.detectLocale(req.headers['accept-language']) || "en";
        localizify.setLocale(lang);

        logHeading(type.toUpperCase() + " (" + lang + ") " + req.url);

        let path = req.path;

        // assume index if path is directory
        if (path.slice(-1) == "/")
            path += "index.html";

        let script = path.split('.')[0] + ".js";
        let server_path = "server" + script; // server side files exist in the server directory
        let client_parms;

        // if there is a server-side script, execute it
        if (fs.existsSync(server_path))
            client_parms = await common_lib.executeServerScript(server_path, type, app, req, res, log);

        if (client_parms && client_parms.forbidden)
        {
            log("\033[1mabort:\033[0m server-side handler set forbidden!");
            res.sendStatus(403);
            res.end();
            return true;
        }

        if (client_parms && client_parms.notfound)
        {
            log("\033[1mabort:\033[0m server-side handler set NOT FOUND!");
            res.redirect('/');
            return true;
        }

        // if redirect specified in server-side handler, do it!
        if (client_parms && client_parms.redirect)
        {
            log("server-side handler redirecting to " + client_parms.redirect);
            res.redirect(client_parms.redirect);
            res.end();
            return true;
        }

        // if newPath specified in server-side handler, change it!
        if (client_parms && client_parms.newPath && client_parms.newPath != path)
        {
            log("server-side handler set newPath: " + client_parms.newPath);
            path = client_parms.newPath;
        }

        // unless server-side handler specified noLocalization, add localization to client_parms
        if (client_parms && !client_parms.noLocalization)
            client_parms.text = localizify.t;

        if (client_parms && client_parms.raw)
        {
            log("sending raw response: " + client_parms.raw)
            res.send(client_parms.raw);
            res.end();
            return;
        }

        // handle the requested path or redirect home if file not found
        if (!client_parms || !client_parms.doNotServe)
        {
            let served;
            if (!served) served = await tryToServe(req, res, "client" + path, client_parms);
            if (!served) served = await tryToServe(req, res, "client" + path + ".ejs", client_parms, serveEjs);
            if (!served) served = await tryToServe(req, res, "client" + path + ".html", client_parms);
            if (!served) served = await tryToServe(req, res, "client/vue" + path, client_parms);
            if (!served)
            {
                log(`path '${path}' not found, redirecting to /`);
                res.redirect('/');
            }
        }

    }
    catch (err) {
        res.send("<pre>" + err.toString() + "</pre>");
        res.end();
        throw (err);
    }

}

const tryToServe = async (req, res, client_path, client_parms, preProcessor) => {

    if (fs.existsSync(client_path)) {

        // make sure we have a token on the querystring unless insecure was specified by the server-side script
        if (client_parms && !client_parms.insecure && !(await common_lib.tryLogin(req))) {
            log("\033[1mabort:\033[0m seurity not passed!");
            res.sendStatus(403);
            res.end();
            return true;
        }

        // make sure terms have been agreed to unless noAgreementAllowed was set by the server-side script
        if (client_parms && !client_parms.noAgreementAllowed && !(await common_lib.tryLogin(req)) && !req.session.user_info.from_db.termsAndConditions) {
            log("\033[1mabort:\033[0m terms not agreed to!");
            res.sendStatus(403);
            res.end();
            return true;
        }

        // kick off asynchronous thread to serve it
        serve(req, res, client_path, client_parms, preProcessor, function (req, res, client_path, client_parms) {
            log("done!");
        });

        return true;
    }
    else // file does not exist
        return false;
}

const serve = async (req, res, client_path, client_parms, serviceProvider, done) =>
{
    if (serviceProvider)
        serviceProvider(req, res, client_path, client_parms, function(req, res, client_path, client_parms) {
            if (done) done(req, res, client_path, client_parms);
        });
    else
    {
        log("\033[1msending:\033[0m " + client_path);
        res.sendFile(__dirname + "/" + client_path);
        if (done) done(req, res, client_path, client_parms);
    }
}

function serveEjs(req, res, client_path, client_parms, done)
{
    log("\033[1mrendering:\033[0m " + client_path + (client_parms ? " with " + JSON.stringify(client_parms) : ""));

    client_parms.req = req;
    client_parms.res = res;
    client_parms.app = app;

    let rtn;

    ejs.renderFile(client_path, client_parms, { debug: false }, function (err, html) {
        if (err) throw err;

        // we have a template, process it!
        if (client_parms && client_parms.template) {
            log("\033[1mapplying template:\033[0m " + client_parms.template);
            client_parms.template_body = html;
            ejs.renderFile("template/" + client_parms.template + ".ejs", client_parms, { debug: false }, function (err, html) {
                if (err) throw err;
                res.send(html);
                if (done) done(req, res, client_path, client_parms);
            });
        }
        else // no template
        {
            res.send(html);
            if (done) done(req, res, client_path, client_parms);
        }

    });

}


// to be expanded later?
function log(s) {
    console.log(new Date().toString().substr(4, 20) + ": " + s);
}

function logHeading(s)
{
    log("\033[4m\033[34m\033[1mrequest:\033[0m\033[4m\033[34m " + s + "\033[0m")
}

// Start the app with listen and a port number
const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port);
console.log("Listening on port " + port);
