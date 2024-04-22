const {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
  checkSupplierId,
} = require("../controller/supplier.controller");

const supplierRouter = require("express").Router();

//create supplier
supplierRouter.post("/add", addSupplier);

//Get suppliers
supplierRouter.get("/get", getSuppliers);

// Get supplier by supplierId
supplierRouter.get("/:id", getSupplierById); // Changed the parameter name to ':id'

//
supplierRouter.get("/check/:supplierId", checkSupplierId);


// Update supplier by supplierId
supplierRouter.patch("/update/:id", updateSupplierById); // Changed the parameter name to ':id'

//Delete supplier by supplierId
supplierRouter.delete("/delete/:_id", deleteSupplierById);

module.exports = supplierRouter;
