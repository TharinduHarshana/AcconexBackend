
// Importing Express Router
const itemKitRouter = require("express").Router();
const { createItemKit, getAllKit, deleteKitById, checkItemKitId, getItemKitById, updateKitById,getItemKitCount} = require("../controller/itemkit.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");

// Route to get the count of item kits
itemKitRouter.get("/count",getItemKitCount);

//  Route to create a new item kit
itemKitRouter.post("/create",createItemKit);
// Route to check if an item kit ID exists
itemKitRouter.get("/check/:itemKitId",checkItemKitId);
// Route to get all item kits, accessible only by admin and inventory manager
itemKitRouter.get("/all",authMiddleware, roleCheck(["admin","inventory manager"]), getAllKit);


//  Route to delete an item kit by ID
itemKitRouter.delete("/delete/:_id",deleteKitById);
//  Route to get an item kit by ID
 itemKitRouter.get("/:id",getItemKitById); 
//  Route to update an item kit by ID
itemKitRouter.patch("/update/:id", updateKitById);



// Exporting the item kit router
module.exports=itemKitRouter;