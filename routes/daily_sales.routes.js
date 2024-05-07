const express = require("express");
const salesrouter = express.Router();
const { addDailysales , getAllDailysales,deleteDailysalesById} = require("../controller/daily_sales.controller");

// Add a new sale
salesrouter.post('/add', addDailysales);

// Get all sale
salesrouter.get("/", getAllDailysales);

//delete sales
salesrouter.delete("/delete/:id", deleteDailysalesById);

// Exporting the router
module.exports = salesrouter;
