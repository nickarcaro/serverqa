/* controlador de usuario */
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

function signUp(req, res) {
  console.log("endpoint de registro");
}

module.exports = {
  signUp,
};
