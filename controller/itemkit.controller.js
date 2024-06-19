//Define item kit controller
const mongoose = require("mongoose");
const ItemKitModel = require("../models/item.kit.model");
const InventoryModel = require("../models/inventory.model");


//create the item kit
// async function createItemKit(req, res) {
//   // Destructure the request body
//   const { itemKitId, itemKitName, itemDescription, price, kitQuantity, items } =
//     req.body;

//   // Validate the request body
//   if (
//     !itemKitId ||
//     !itemKitName ||
//     !itemDescription ||
//     !price ||
//     !kitQuantity ||
//     !items ||
//     items.length === 0
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, error: "Missing required fields" });
//   }

//   try {
   
//     // Create a new item kit
//     const newItemKit = new ItemKitModel({
//       itemKitId,
//       itemKitName,
//       itemDescription,
//       price,
//       kitQuantity,
//       items: items.map((item) => ({
//         productID: item.productID,
//         itemQuantity: item.quantity,
//       })),
//     });

//     // Save the item kit to the database
//     const savedItemKit = await newItemKit.save();

//     res.status(201).json({ success: true, data: savedItemKit });
//   } catch (error) {
//     console.error("Error saving item kit:", error);

//     res.status(500).json({ success: false, error: error.message });
//   }
// }

async function createItemKit(req, res) {
  const { itemKitId, itemKitName, itemDescription, price, kitQuantity, items } = req.body;

  // Validate the request body
  if (!itemKitId ||!itemKitName ||!itemDescription ||!price ||!kitQuantity ||!items || items.length === 0) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
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

    const savedItemKit = await newItemKit.save();

    // Update inventory items' quantities based on the items included in the kit
    const updatedInventoryItems = await InventoryModel.find({ productID: { $in: items.map(item => item.productID) } });
    updatedInventoryItems.forEach(async (item) => {
      const kitItem = items.find(kitItem => kitItem.productID === item.productID);
      if (kitItem) {
        item.quantity -= kitItem.quantity;
        await item.save();
      }
    });

    res.status(201).json({ success: true, data: savedItemKit, updatedInventoryItems });
  } catch (error) {
    console.error("Error creating item kit:", error);
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
//  Function to get a single item kit by ID
const getItemKitById = async function getItemKitById(req, res) {
  try {
    const kit = await ItemKitModel.findById({ _id: req.params.id });
    res.status(200).json({ success: true, data: kit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Function to update kit
const updateKitById = async (req, res) => {
  console.log("updateKitById called with ID:", req.params.id);
  try {
    const _id = req.params.id; // Extracting item kit ID from the URL path
    const updateData = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid item kit ID" });
    }

    // Find the item kit by ID and update it
    const updatedItemKit = await ItemKitModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedItemKit) {
      return res
        .status(404)
        .json({ success: false, message: "Item Kit not found" });
    }

    console.log("Updated item kit:", updatedItemKit); // Log the updated data

    res.status(200).json({ success: true, data: updatedItemKit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createItemKit,
  getAllKit,
  checkItemKitId,
  deleteKitById,
  getItemKitById,
  updateKitById,
};
