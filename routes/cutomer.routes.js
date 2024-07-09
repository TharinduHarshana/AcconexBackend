const express = require("express");
const customerRouter = express.Router();
const { addCustomer, getAllCustomers, updateCustomerById, getCustomerById, deleteCustomerById,getCustomerByName,getCustomerCount } = require("../controller/customer.controller");

// Add a new customer
customerRouter.post('/add', addCustomer);

//get registered customers count
customerRouter.get("/count", getCustomerCount);

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



// Exporting the router
module.exports = customerRouter;
