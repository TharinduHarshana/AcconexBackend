const express = require("express");
const router = express.Router();
const { addCustomer, getAllCustomers, updateCustomerById, getCustomerById, deleteCustomerById,getCustomerByName,getCustomerCount } = require("../controller/customer.controller");

// Add a new customer
router.post('/add', addCustomer);

// Get all customers
router.get("/", getAllCustomers);


// Update a customer by ID
router.patch("/update/:id", updateCustomerById);


// Get a customer by ID
router.get("/get/:id", getCustomerById);


//get customer by name
router.get("/getbyName/:name",getCustomerByName);


// Delete a customer by ID
router.delete("/delete/:id", deleteCustomerById);

//get registered customers count
router.get("/count", getCustomerCount);

// Exporting the router
module.exports = router;
