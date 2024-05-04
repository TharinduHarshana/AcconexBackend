

const mongoose = require("mongoose");
const ItemKitModel = require("../models/item.kit.model");

//create the item kit
async function createItemKit(req, res) {
  // Destructure the request body
  const { itemKitId, itemKitName, itemDescription, price, kitQuantity, items } =
    req.body;

  // Validate the request body
  if (
    !itemKitId ||
    !itemKitName ||
    !itemDescription ||
    !price ||
    !kitQuantity ||
    !items ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
     // Fetch the current inventory items
    // const inventoryItems = await InventoryModel.find({
    //   productID: { $in: items.map((item) => item.productID) },
    // });

    // // Update the quantity of each item in the inventory
    // const updatedInventoryItems = items
    //   .map((item) => {
    //     const inventoryItem = inventoryItems.find(
    //       (i) => i.productID === item.productID
    //     );
    //     if (inventoryItem) {
    //       inventoryItem.quantity -= item.itemQuantity; // Reduce the quantity
    //       return inventoryItem;
    //     }
    //     return null; // Return null if the item is not found in the inventory
    //   })
    //   .filter((item) => item !== null); // Filter out null values

    // // Save the updated inventory items back to the database
    // await InventoryModel.updateMany(updatedInventoryItems, {
    //   quantity: { $set: updatedInventoryItems.map((item) => item.quantity) },
    // });

    // Create a new item kit
    const newItemKit = new ItemKitModel({
      itemKitId,
      itemKitName,
      itemDescription,
      price,
      kitQuantity,
      items: items.map((item) => ({
        productID: item.productID,
        itemQuantity: item.quantity,
      })),
    });

    // Save the item kit to the database
    const savedItemKit = await newItemKit.save();

  
    res.status(201).json({ success: true, data: savedItemKit });
  } catch (error) {
    console.error("Error saving item kit:", error);
    
    res.status(500).json({ success: false, error: error.message });
  }
}

// Function to get all item kits
const getAllKit = async function getAllKits(req, res) {
  try {
    const kit = await ItemKitModel.find();
    res.status(200).json({ success: true, data: kit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//check item kit id
async function checkItemKitId(req, res) {
  try {
    const itemKit = await ItemKitModel.findOne({
      itemKitId: req.params.itemKitId,
    });
    if (itemKit) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

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
module.exports = { createItemKit, getAllKit, checkItemKitId, deleteKitById };
