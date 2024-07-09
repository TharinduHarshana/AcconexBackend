const express = require("express");
const salesrouter = express.Router();
const { addDailysales, getAllDailysales, deleteDailysalesById, getDailysalesbyDate,getDailysalesCount,getMonthlyTotalSales,getWeeklyTotalSales} = require("../controller/daily_sales.controller");



// Get monthly total sales
salesrouter.get("/monthly_totals", getMonthlyTotalSales);


// Get weekly total sales
salesrouter.get("/weekly_totals", getWeeklyTotalSales);

// Add a new sale
salesrouter.post('/add', addDailysales);

// Get all sales
salesrouter.get("/", getAllDailysales);

// Get sales by date
salesrouter.get("/get/:date", getDailysalesbyDate);

// Delete sale by sales id
salesrouter.delete("/delete/:id", deleteDailysalesById);

//daily sales count 
salesrouter.get("/count", getDailysalesCount);




module.exports = salesrouter;