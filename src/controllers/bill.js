const Bill = require("../models/bill");

function addBill(req, res) {
  const body = req.body;
  const bill = new Bill(body);
  console.log(body);
  bill.save((err, billStored) => {
    if (err) {
      res.status(400).send({
        code: 400,
        message: "La factura que estas creando ya existe.",
      });
    } else {
      if (!billStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear la factura." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Factura creada correctamente." });
      }
    }
  });
}

function getBills(req, res) {
  Bill.find()
    .sort({ order: "asc" })
    .exec((err, BillStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!BillStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ninguna Factura.",
          });
        } else {
          res.status(200).send({ code: 200, bills: BillStored });
        }
      }
    });
}

function deleteBill(req, res) {
  const { id } = req.params;

  Bill.findByIdAndRemove(id, (err, billDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!billDeleted) {
        res.status(404).send({ code: 404, message: "Factura no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "La factura ha sido eliminada correctamente.",
        });
      }
    }
  });
}

function updateBill(req, res) {
  const billData = req.body;
  const id = req.params.id;

  Bill.findByIdAndUpdate(id, billData, (err, billUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!billUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ninguna factura." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Factura actualizada correctamente." });
      }
    }
  });
}

module.exports = {
  addBill,
  getBills,
  deleteBill,
  updateBill,
};
