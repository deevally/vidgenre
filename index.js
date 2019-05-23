const winston = require("winston");
const express = require("express");
const app = express();


require("./startup/logging")();
 require('./startup/db')();
require("./startup/routes")(app);
 require("./startup/config")();
 require("./startup/validation")();





process.on("uncaughtException", ex => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(ex.message,ex);
  process.exit(1);
});

process.on("unhandledRejection", ex => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  winston.error(ex.message, ex);
  process.exit(1);
});

require("./startup/logging");



const port = process.env.PORT || 3000;
const server =  app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;