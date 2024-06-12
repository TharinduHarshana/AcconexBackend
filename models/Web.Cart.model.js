
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WebUserModel',
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    itemDisplayName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    // You can add more fields like quantity, price, etc.
});

module.exports = mongoose.model('Cart', CartSchema);
