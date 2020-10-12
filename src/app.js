const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");

const app = express();
app.use(cors());

// carga de rutas
const userRoutes = require("./routes/user");

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP

// Ruteo
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;

/* comentarios respecto al funcioamiento del servidor
1. se crea el modelo en la carpeta models (donde se conecta a mongodb)
2. se crea el controllador, que realiza las operaciónes ligadas al modelo (antes debe importar el modelo)
   por ej: modelo usuario, el controlador hace registro , login , etc.
3. se crea la ruta en carpeta routes, importando el controllador  ( la /ruta de la api)
4. se importa en app, para ser usados en la api
*/
