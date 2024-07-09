const mongoose = require('mongoose');
const WebUserSchema = new mongoose.Schema({
    fname : {
        type: String,
        required: true,
    },
    lname : {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    city: {
        type: String,
    },
    zip: {
        type: Number,
    },
    profileImage: {
        type: String,
    },
    shippingAddres: {
        type: String,
    },
    shippingCity: {
        type: String,
    },
    shippingZip: {
        type: Number,
    },
    shippingContactNumber: {
        type: Number,
    },

});


const WebUserModel = mongoose.model('WebUser', WebUserSchema);
module.exports = WebUserModel;