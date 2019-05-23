const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const genres = require("../routes/genres");
const express = require("express");
const app = express();

module.exports =  function(app){
    app.use(express.json());
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/movies", movies);
    app.use("/api/rentals", rentals);
    app.use("/api/register", users);
    app.use("/api/login", auth);
    app.use(error);

}