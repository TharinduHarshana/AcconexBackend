const Inventory = require('../models/inventory.model');//get module
const { check, validationResult } = require('express-validator'); // validation module import

//add new Item
const addNewItem = async(req,res) =>{
    //check validation
    check('displayName').notEmpty().withMessage('Enter Display Name');
    check('itemName').notEmpty().withMessage('Enter Item Name');
    check('quantity').notEmpty().withMessage('Enter Item quantity');
    check('costPrice').notEmpty().withMessage('Enter Cost Price');
    check('sellingPrice').notEmpty().withMessage('Enter Selling Price');
    check('category').notEmpty().withMessage('Select Category');
    
        // Return validation errors
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            next();
        }

    // Adding new item database
    try { 
        const item = new Inventory(req.body);
        const result = await item.save();

        if(result)
            res.status(201).json({success: true, message: "New Item Added Successfully"});
        else 
            res.status(400).json({success: false, message: "New Item Added Failed"}); 

    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}


// Get all items 
const getAllItems = async (req, res) => {
        try {
            const items = await Inventory.find();
    
            if (!items || items.length === 0)
                return res.status(404).json({ success: false, message: 'No recipes found' });
    
            res.status(200).json({ success: true, data: items });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
}


// Get a single item using ID
const getItemByID = async (req, res) => {
    try {
        const Item = await Inventory.findById(req.params.id);

        if (! Item)
            return res.status(404).json({ success: false, message: 'Item not found'});

        res.status(200).json({ success: true, data: Item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
}



// Update a item by id
const updateItemByID = async (req, res) => {

// Check for validation
check('displayName').notEmpty().withMessage('Enter Display Name');
check('itemName').notEmpty().withMessage('Enter Item Name');
check('quantity').notEmpty().withMessage('Enter Item quantity');
check('costPrice').notEmpty().withMessage('Enter Cost Price');
check('sellingPrice').notEmpty().withMessage('Enter Selling Price');
check('category').notEmpty().withMessage('Select Category');

// Return validation errors
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
}

    // Updating Item
    try {
        const { productID , displayName , itemName , discription, quantity , costPrice , sellingPrice , fixedPrice , itemSereal , supplierID , warranty , category } = req.body;
        const updateData = { productID , displayName , itemName , discription, quantity , costPrice , sellingPrice , fixedPrice , itemSereal , supplierID , warranty , category };
        const updateItem = await Inventory.findByIdAndUpdate(req.params.id, updateData);

        if (!updateItem) 
            return res.status(404).json({ success: false, message: 'Item not found' });

        res.status(200).json({ success: true, message: 'Item Updated Successfully', data: updateItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to update item', error: err.message });
    }
}



// Delete a item by id
const deleteItemById = async (req, res) => {
    try {
        const deleteItemById = await Inventory.findByIdAndDelete(req.params.id);

        if (!deleteItemById) 
            return res.status(404).json({ success: false, message: 'Item not found' });

        res.status(200).json({ success: true, message: 'item Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete item', error: err.message });
    }
}

//get all items counr
const getItemCount = async (req, res) => {
    try {
        const items = await Inventory.find().countDocuments();

        if (!items || items.length === 0)
            return res.status(404).json({ success: false, message: 'No recipes found' });

        res.status(200).json({ success: true, data: items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}




// Exporting APIs
module.exports = {addNewItem , getAllItems , getItemByID , updateItemByID , deleteItemById, getItemCount};