const mongoose = require('mongoose')
const CONFIG = require('dotenv').config()

if (CONFIG.error) {
  console.log(CONFIG.error)
}

function _connect(url) {
  mongoose.connect(url, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
}

module.exports = {
  connect: () => {
    console.log("Connecting to DB: ", process.env.DB_URL)
    _connect(process.env.DB_URL)
  },
  connectTesting: () => {
    console.log("Connecting to TESTING DB: ", process.env.DB_TESTING_URL)
    _connect(process.env.DB_TESTING_URL)
  }
}

