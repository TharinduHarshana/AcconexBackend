// Importing mongoose for MongoDB schema creation
const mongoose = require("mongoose");
const { Schema } = mongoose; 

// Defining the schema for the Item Kit
const itemKitSchema = new Schema({
    itemKitId: { type: String, required: true ,unique:true},
    itemKitName: { type: String, required: true },
    itemDescription: { type: String },
    price: { type: Number},
    quantity: { type: Number },
    items: [{ type: String, ref: 'Inventory', required: true }]// Array of items included in the item kit, referencing Inventory model
    
    
});
// Creating a model based on the schema
const ItemKitModel = mongoose.model("Item Kit", itemKitSchema); 
// Exporting the Item Kit model
module.exports = ItemKitModel;
