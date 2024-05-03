const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the customer schema

const webCustomerSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    contactnumber: String,
    email: String,
    username: String,
    password: String,
    role:{
        type: String,
        default: 'customer'
    }

})

module.exports = mongoose.model('WebCustomer',webCustomerSchema);