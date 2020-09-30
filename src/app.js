const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { API_VERSION } = require("./config");

// carga de rutas
const userRoutes = require("./routes/user");

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP

// Ruteo
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
