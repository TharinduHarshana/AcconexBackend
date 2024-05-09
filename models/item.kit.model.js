// Importing mongoose for MongoDB schema creation

const mongoose = require("mongoose");

// Defining the inventory schema
const itemKitSchema = new mongoose.Schema({
  itemKitId: {
    type: String,
    required: true,
    unique: true,
  },
  itemKitName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  kitQuantity: {
    type: Number,
    required: true,
  },
  items: [
    {
      productID: {
        type: String,
        required: true,
        ref: "Inventory",
      },
      itemQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Directly use mongoose.model() to avoid circular dependencies
const ItemKitModel = mongoose.model("ItemKit", itemKitSchema);

module.exports = ItemKitModel;
