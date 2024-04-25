const { createItemKit, checkItemKitId,  getAllKit, deleteKitById, getItemKitById, updateKitById } = require("../controller/itemkit.controller");

const itemKitRouter = require("express").Router();

//create item kit
itemKitRouter.post("/create",createItemKit);
//check item kit
itemKitRouter.get("/check/:itemKitId",checkItemKitId);
//get all kits
itemKitRouter.get("/all",getAllKit);
//delete kit by id
itemKitRouter.delete("/delete/:_id", deleteKitById);
//get the item kit by id
itemKitRouter.get("/:id", getItemKitById); 
//update item kit
itemKitRouter.patch("/update/:id", updateKitById); 


module.exports=itemKitRouter;