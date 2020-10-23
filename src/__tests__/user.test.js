const { signUp } = require("../controllers/user");
/* tdd con jest , 
primer paso: escribe una prueba 
segundo paso: ejecuta yarn test (correra el script jest realizando prueba)
tercer paso: falla , guardas la informacion que te brinda la terminal
cuarto paso: rrescribe la prueba a modo que funcione
quinto paso: refactorizar codigo (escribir el componente original mas eficiente)
fin del comunicado
*/
const user = require("../routes/user");
const request = require("supertest");
const md_auth = require("../middlewares/authenticated");

// prueba de  funcion signup

request(user)
  .get("/users")

  .expect("Content-type", "/json/")
  .then((res) => {});

//prueba funcion login
