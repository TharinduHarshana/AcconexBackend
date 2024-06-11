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
    }
});


const WebUserModel = mongoose.model('WebUser', WebUserSchema);
module.exports = WebUserModel;