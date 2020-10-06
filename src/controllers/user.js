/* controlador de usuario */
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

/* funcion de registro de usuario */
function signUp(req, res) {
  const user = new User();
  console.log(req.body);

  const { email, name, lastname, rut, password, repeatPassword } = req.body; //datos para registro

  user.name = name;
  user.lastname = lastname;
  user.rut = rut;
  user.email = email.toLowerCase();
  user.role = "vendedor"; //role vendedor por defecto
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no coinciden." });
    } else {
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash; //encriptado de la contraseña
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

module.exports = {
  signUp,
};
