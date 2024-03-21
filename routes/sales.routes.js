const express = require("express");
const router = express.Router();
const { addCustomer, getAllCustomers, updateCustomerById, getCustomerById, deleteCustomerById } = require("../controller/sales.controller");

// Add a new customer
router.post('/add', addCustomer);

// Get all customers
router.get("/", getAllCustomers);

// Update a customer by ID
router.patch("/update/:id", updateCustomerById);

// Get a customer by ID
router.get("/get/:id", getCustomerById);

// Delete a customer by ID
router.delete("/delete/:id", deleteCustomerById);

// Exporting the router
module.exports = router;
