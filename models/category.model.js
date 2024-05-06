const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Defining the inventory schema
const inventorySchema = new Schema({
    category : {type: String, required: true},
    name: {type: String, require:true},
    description: {type: String},
    imgUrl: {type: String},  
},{
    timestamps: true,
});

// Exporting inventory
module.exports = mongoose.model('Category',categorySchema);