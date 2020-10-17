/* modelo usuario */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = Schema({
  fecha: { type: Date, default: Date.now },
  nombreSoc: String,
  rut: String,
  giro: String,
  direccion: String,
  comuna: String,
  ciudad: String,
  telefono: String,
  medioPago: String,
  formaPago: String,
  data: [
    {
      cant: Number,
      detail: String,
      punitary: Number,
    },
  ],
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//crear metodo de calcular los valores

module.exports = mongoose.model("Bill", BillSchema);