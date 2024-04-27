
const ItemKitModel = require("../models/item.kit.model");
const mongoose = require("mongoose");

// Function to create a new item kit
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

// Function to check if an item kit ID exists
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

// Function to get all item kits
const getAllKit= async function getAllKits(req, res) {
  try {
    const kit = await ItemKitModel.find();
    res.status(200).json({ success: true, data: kit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Function to update an item kit by ID
const updateKitById = async function updateItemKit(req, res) {
  console.log("updateKitById called with ID:", req.params.id)
  try {
    const _id = req.params.id; // Extracting user ID from the URL path
    const { itemKitId, itemKitName, itemDescription, price,quantity, items } = req.body;
    // Validate required fields
    // if (!itemKitId || !itemKitName || !price || !items || !items.length) {
    //   return res.status(400).json({ msg: "All fields are required" });
    // }
    const updateData = { itemKitId, itemKitName, itemDescription, price,quantity, items };

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, message: "Invalid item kit ID" });
    }

    // Find the kit by ID and update it
    const updateItemKit = await ItemKitModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updateItemKit) {
      return res.status(404).json({ success: false, message: "Item Kit not found" });
    }

    console.log("Updated item kit:", updateItemKit); // Log the updated data

    res.status(200).json({ success: true, data: updateItemKit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Function to delete an item kit by ID
const deleteKitById = async (req, res) => {
  try {
    const deleteKitById = await ItemKitModel.findByIdAndDelete(req.params._id);

    if (!deleteKitById)
      return res
        .status(404)
        .json({ success: false, message: "Item kit not found" });

    res
      .status(200)
      .json({ success: true, message: "Item kit Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete item kit",
      error: err.message,
    });
  }
};


// Function to get a single item kit by ID
const getItemKitById = async function getItemKitById(req, res) {
  try {
    const kit = await ItemKitModel.findById({ _id: req.params.id });
    res.status(200).json({ success: true, data: kit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
 
// Exporting all functions
module.exports = { createItemKit,checkItemKitId,getAllKit,deleteKitById,getItemKitById,updateKitById};
