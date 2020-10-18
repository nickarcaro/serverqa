/* controlador de usuario */
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

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

//funcion de login

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        userData.password = hash;
      }
    });
  }

  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
      } else {
        res.status(200).send({ message: "Usuario actualizado correctamente." });
      }
    }
  });
}

function activateUser(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "No se ha encontrado el usuario." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Usuario activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Usuario desactivado correctamente." });
        }
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
  activateUser,
  updateUser,
};
