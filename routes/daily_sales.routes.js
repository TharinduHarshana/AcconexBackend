const express = require("express");
const salesrouter = express.Router();
const { addDailysales, getAllDailysales, deleteDailysalesById, getDailysalesbyDate } = require("../controller/daily_sales.controller");

// Add a new sale
salesrouter.post('/add', addDailysales);

// Get all sales
salesrouter.get("/", getAllDailysales);

// Get sales by date
salesrouter.get("/get/:date", getDailysalesbyDate);

// Delete sale by sales id
salesrouter.delete("/delete/:id", deleteDailysalesById);

module.exports = salesrouter;
