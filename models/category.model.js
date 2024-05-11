const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Defining the inventory schema
const categorySchema = new Schema({
    categoryname: {type: String, require:true},
    description: {type: String},
    imageLink: {type: String},  
});

// Exporting inventory
module.exports = mongoose.model('Category',categorySchema);