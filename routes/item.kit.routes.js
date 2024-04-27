const { createItemKit, checkItemKitId,  getAllKit, deleteKitById, getItemKitById, updateKitById } = require("../controller/itemkit.controller");
// Importing Express Router
const itemKitRouter = require("express").Router();

// Route to create a new item kit
itemKitRouter.post("/create",createItemKit);
// Route to check if an item kit ID exists
itemKitRouter.get("/check/:itemKitId",checkItemKitId);
// Route to get all item kits
itemKitRouter.get("/all",getAllKit);
// Route to delete an item kit by ID
itemKitRouter.delete("/delete/:_id", deleteKitById);
// Route to get an item kit by ID
itemKitRouter.get("/:id", getItemKitById); 
// Route to update an item kit by ID
itemKitRouter.patch("/update/:id", updateKitById); 

// Exporting the item kit router
module.exports=itemKitRouter;