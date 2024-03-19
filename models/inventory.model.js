const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    productID : {type : String, required : true},
    displayName: {type : String, required : true},
    itemName: {type : String, required : true},
    quantity: {type : Number, required : true},
    costPrice: {type : Number, required : true},
    sellingPrice: {type : Number, required : true},
    fixedPrice: {type : Number,},
    itemSerial: {type : String,},
    supplierID: {type : Number,},
    warranty: {type : String,},
    category: {type : Number,required:true},
},{
    timestamps: true,
});

module.exports = mongoose.model('Inventroy',InventorySchema);