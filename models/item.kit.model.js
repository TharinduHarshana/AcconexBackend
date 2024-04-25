const mongoose = require("mongoose");
const { Schema } = mongoose; 

const itemKitSchema = new Schema({
    itemKitId: { type: String, required: true ,unique:true},
    itemKitName: { type: String, required: true },
    itemDescription: { type: String },
    price: { type: Number},
    quantity: { type: Number },
    items: [{ type: String, ref: 'Inventory', required: true }]
    
    
});

const ItemKitModel = mongoose.model("Item Kit", itemKitSchema); 
module.exports = ItemKitModel;
