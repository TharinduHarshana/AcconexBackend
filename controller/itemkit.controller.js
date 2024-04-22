
const ItemKitModel = require("../models/item.kit.model");

async function createItemKit(req, res) {
  try {
    // Extract required fields from the request body
    const { itemKitId, itemKitName, itemDescription, price, quantity, items } = req.body;

    // Validate required fields
    if (!itemKitId || !itemKitName || !price || !quantity || !items || !items.length) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if itemKitId already exists
    const existingItemKit = await ItemKitModel.findOne({ itemKitId });
    if (existingItemKit) {
      return res.status(400).json({ msg: "Item Kit ID already exists" });
    }

    // Create a new item kit document
    const newItemKit = await ItemKitModel.create({
      itemKitId,
      itemKitName,
      itemDescription,
      price,
      quantity,
      items
    });

    // Send success response with the newly created item kit document
    res.status(200).json({ success: true, data: newItemKit });
  } catch (error) {
    console.error("Error creating item kit:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function checkItemKitId(req,res){
  try {
    const itemKit = await ItemKitModel.findOne({ itemKitId: req.params.itemKitId });
    if (itemKit) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
 }
}

module.exports = { createItemKit,checkItemKitId};
