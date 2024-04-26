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
// Exporting APIs
module.exports = { getAllItems, getCategoryWiseItems};
