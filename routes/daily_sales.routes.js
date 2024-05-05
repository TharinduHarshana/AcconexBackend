const express = require("express");
const salesrouter = express.Router();
const { addDailysales , getAllDailysales} = require("../controller/daily_sales.controller");

// Add a new sale
salesrouter.post('/add', addDailysales);

// Get all sale
salesrouter.get("/", getAllDailysales);


// Exporting the router
module.exports = salesrouter;
