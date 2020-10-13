const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA";

//funcion de creacion de token de acceso
exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    rut: user.rut,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};
//token de sesion refresh
exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

//decodificar token
exports.decodedToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
