const express = require("express");
const router = express.Router();
const { addCustomer, getAllCustomers, updateCustomerById, getCustomerById, deleteCustomerById,getCustomerByName,getCustomerCount } = require("../controller/customer.controller");

// Add a new customer
customerRouter.post('/add', addCustomer);

// Get all customers
customerRouter.get("/", getAllCustomers);


// Update a customer by ID
customerRouter.patch("/update/:id", updateCustomerById);


// Get a customer by ID
customerRouter.get("/get/:id", getCustomerById);


//get customer by name
customerRouter.get("/getbyName/:name",getCustomerByName);


// Delete a customer by ID
customerRouter.delete("/delete/:id", deleteCustomerById);

//get registered customers count
router.get("/count", getCustomerCount);

// Exporting the router
module.exports = customerRouter;
