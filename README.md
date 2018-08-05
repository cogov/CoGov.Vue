# CoGov.Vue

## Installing and Serving CoGov

Install NPM and NodeJS: https://nodejs.org/en/

### Install Vue CLI:
`npm install -g @vue/cli`
`npm install -g @vue/cli-service-global`

### Clone this repository:
`git clone https://github.com/rayzer42/CoGov.Vue`

### Install Dependent Packages:
`npm install`

### Serve it up for development:
`vue serve src/main.js`

### Vue Dashboard:
`vue ui`

### To Build it for Test
`./node_modules/.bin/vue-cli-service build --mode test`

### To Build it for Production
`./node_modules/.bin/vue-cli-service build`

### To Run for Test/Prodction
`cd server && node server.js`

\- OR -

`cd server && node_modules/nodemon/bin/nodemon.js server.js`
