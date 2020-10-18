const BillController = require("../controllers/bill");
const express = require("express");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-bill", [md_auth.ensureAuth], BillController.addBill);
api.get("/get-bills", BillController.getBills);
api.delete("/delete-bill/:id", [md_auth.ensureAuth], BillController.deleteBill);
api.put("/update-bill/:id", [md_auth.ensureAuth], BillController.updateBill);

module.exports = api;
