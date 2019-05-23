const winston = require("winston");
// require('winston-mongodb');
require("express-async-errors");

const { createLogger, transports } = require("winston");


module.exports = function(){
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: "combined.log" })
  ],
    exceptionHandlers: [new transports.File({ filename: "exceptions.log" })]
});

}

// winston.add(
//   new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
// );


// Enable exception handling when you create your logger.
// module.exports = function(){
// const logger = createLogger({
//   transports: [new transports.File({ filename: "combined.log" })],
//   exceptionHandlers: [new transports.File({ filename: "exceptions.log" })]
// });
// winston.add(
//   new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
// );
// }



//  
// logger.error(err.message);

// const p = new Promise( new Error("IT FAILED WOEFULLY"));

// p.then(()=> console.log('DONEEEE'));