// Daily_sales.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the daily sale collection
const DailysalesSchema = new Schema({
   POSNO: {
        type: String,
        unique: true, 
        required: true 
    },
   cashirename: {
        type: String,
        required: true 
    },
    datetime: {
        type: String,
        required: true 
    },
    customername: {
        type: String,
        required: true 
    },
    itemcount: {
        type: Number,
        required: true 
    },
    paymentmethod: {
        type: String,
        required: true 
    },
    totalamount: {
        type: Number,
        required: true 
    },
    totalcost: {
        type: Number,
        required: true 
    },
    profit: {
        type: Number,
        required: true 
    }
});

// Create the daily sale model using the schema
const Dailysales = mongoose.model("Daily_sales", DailysalesSchema);

// Export the daily sale model
module.exports = Dailysales

