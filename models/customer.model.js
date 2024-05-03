// customer.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Customer collection
const CustomerSchema = new Schema({
    cusid: {
        type: String,
        unique: true, // Ensure cusid is unique
        required: true // Make cusid a required field
    },
    name: {
        type: String,
        required: true // Make name a required field
    },
    address: {
        type: String,
        required: true // Make address a required field
    },
    mobile: {
        type: String,
        required: true // Make mobile a required field
    }
});

// Create the Customer model using the schema
const Customer = mongoose.model("Customer", CustomerSchema);

// Export the Customer model
module.exports = Customer;

