//modelo del historial del mes de todas las cuentas del vendedor
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoricalSchema = Schema({
  name: String,
  date: { type: Date, default: Date.now },
  facturas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
    },
  ],
});

module.exports = mongoose.model("Historical", HistoricalSchema);
