const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Defining the inventory schema
const inventorySchema = new Schema({
    productID : {type: String, required: true},
    displayName: {type: String, require:true},
    itemName: {type: String, require:true},
    quantity: {type: Number, required:true},
    costPrice: {type: Number, required:true},
    sellingPrice: {type: Number, required: true},
    fixedPrice: {type: Number,},
    itemSerial: {type: String},
    supplierID: {type:String},
    warranty:{type:String},
    category: {type:String, require:true},
    imageLink: {type:String},
    description: {type:String, require:true},
},);

// Exporting inventory
module.exports = mongoose.model('Inventory',inventorySchema);