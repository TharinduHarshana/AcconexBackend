const express = require("express");
const suspendrouter = express.Router();
const { addsuspend,getAllSuspensale,deleteSuspendSale } = require("../controller/suspend_sale.controller");

// Add a new suspend sale
suspendrouter.post('/add', addsuspend);

// Get all sale
suspendrouter.get("/", getAllSuspensale);

//delete sales
suspendrouter.delete("/delete/:id", deleteSuspendSale);

// Export the router
module.exports = suspendrouter;
