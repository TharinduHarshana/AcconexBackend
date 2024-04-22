const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const itemKitSchema = new Schema({
    itemKitId: { type: String, required: true ,unique:true},
    itemKitName: { type: String, required: true },
    itemDescription: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    items: [{ type: String, ref: 'Inventory', required: true }]
    
    
});

const ItemKitModel = mongoose.model("Item Kit", itemKitSchema); // Use mongoose.model to create the model
module.exports = ItemKitModel;
