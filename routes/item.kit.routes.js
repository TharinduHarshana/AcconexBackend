const { createItemKit, checkItemKitId } = require("../controller/itemkit.controller");

const itemKitRouter = require("express").Router();

//create item kit
itemKitRouter.post("/create",createItemKit);
//check item kit
itemKitRouter.get("/check/:itemKitId",checkItemKitId);

module.exports=itemKitRouter;