const Inventory = require('../models/inventory.model');//get module

// Get all items 
const getAllItems = async (req, res) => {
        try {
            const items = await Inventory.find();
    
            if (!items || items.length === 0)
                return res.status(404).json({ success: false, message: 'No items found' });
    
            res.status(200).json({ success: true, data: items });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
}

//Get category wise items
const getCategoryWiseItems = async (req, res) => {
    try {
        const category = req.params.category;
        const items = await Inventory.find({ category: category });
        console.log(items);
        if (!items || items.length === 0)
            return res.status(404).json({ success: false, message: 'No items found' });
        res.status(200).json({ success: true, data: items });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
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
        const { productID , displayName , itemName , quantity , costPrice , sellingPrice , fixedPrice , itemSereal , supplierID , warranty , category } = req.body;
        const updateData = { productID , displayName , itemName , quantity , costPrice , sellingPrice , fixedPrice , itemSereal , supplierID , warranty , category };
        const updateItem = await Inventory.findByIdAndUpdate(req.params.id, updateData);

        if (!updateItem) 
            return res.status(404).json({ success: false, message: 'Item not found' });

        res.status(200).json({ success: true, message: 'Item Updated Successfully', data: updateItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to update item', error: err.message });
    }
}


// Exporting APIs
module.exports = {addNewItem , getAllItems,updateItemByID, getCategoryWiseItems};
