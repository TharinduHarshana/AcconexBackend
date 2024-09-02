const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supSchema = new Schema({
  supplierId: { type: String, unique: true },
  firstName: { type: String, required: true },
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  items: [
    {
      productID: {
        type: String,
        ref: "Inventory",
      },
    },
  ],
});

const SupplierModel = model("Supplier", supSchema);
module.exports = SupplierModel;
