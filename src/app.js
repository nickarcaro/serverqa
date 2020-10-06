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

/* comentarios respecto al funcioamiento del servidor 
1. se crea el modelo en la carpeta models (donde se conecta a mongodb)
2. se crea el controllador, que realiza la operación (antes debe importar el modelo)
3. se crea la ruta en carpeta routes, importando el controllador  
4. se importa en app, para ser usados en la api 
*/
