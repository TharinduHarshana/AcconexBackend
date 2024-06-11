const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    orderSummary:{
        type: String,
        required: true
    },
    orderDate:{
        type: Date,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    }

    });

module.exports = mongoose.model('Orders', ordersSchema);
