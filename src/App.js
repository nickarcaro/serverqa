const express = require("express");
const app = express();

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use(require("./routes/index"));

function sum(a, b) {
  return a + b;
}
module.exports = sum;
