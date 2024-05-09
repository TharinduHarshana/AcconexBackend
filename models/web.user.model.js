const mongoose = require('mongoose');
const WebUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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