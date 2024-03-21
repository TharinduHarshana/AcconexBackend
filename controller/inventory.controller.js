
const {check, validationResult} = require('express-validator'); //validation model import
const ItemModel = require('../models/inventory.model');
const mongoose = require("mongoose");

//add new item
async function addItem(req, res) {
    try {
        const {
            productID,
            displayName,
            itemName,
            quantity,
            costPrice,
            sellingPrice,
            fixedPrice,
            itemSerial,
            supplierID,
            warranty,
            category
        } = req.body; // Corrected the destructuring assignment syntax

        const itmRes = await ItemModel.create({
            productID,
            displayName,
            itemName,
            quantity,
            costPrice,
            sellingPrice,
            fixedPrice,
            itemSerial,
            supplierID,
            warranty,
            category
        });

        console.log(itmRes);
        return res.status(201).json({ success: true, data: itmRes }); // Changed status code to 201 for successful creation
    } catch (error) { // Changed "Error" to "error" for consistency and corrected the catch block syntax
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" }); // Changed status code to 500 for server error
    }
}

const getAllItems = async(req,res) =>{
    try{
        const items = await Inventory.find();
        if(!items || items.length==0)
            return res.status(404).json({success:false , message: 'No item found'});
        return res.status(200).json({success:false, data: items});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false , message:'Server Error'});
    }
}

module.exports = {addItem,getAllItems}