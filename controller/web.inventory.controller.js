const Inventory = require('../models/web.inventory.model');//get module

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

// Exporting APIs
module.exports = { getAllItems};