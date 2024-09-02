const router = require('express').Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");
const {addNewItem ,getAllItems , getItemByID , updateItemByID , deleteItemById,getItemCount,updateItemByProductID,getItemByProductID} = require('../controller/inventory.controller');

//get all items count
router.get('/count', getItemCount);

// Add a new Item
router.post('/add', addNewItem);

// get all items
router.get('/',getAllItems);

//get item using ID
router.get('/:id', getItemByID);

//get item using productID
router.get('/get/:productID', getItemByProductID);

//Update item Using ID
router.patch('/update/:id',updateItemByID);

//Delete item using ID
router.delete('/delete/:id',authMiddleware, roleCheck(["admin"]),deleteItemById)

//update item by product id
router.patch('/update/productID/:productID', updateItemByProductID);



module.exports = router;
