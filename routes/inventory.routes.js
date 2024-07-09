const router = require('express').Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");
const {addNewItem ,getAllItems , getItemByID , updateItemByID , deleteItemById,getItemCount} = require('../controller/inventory.controller');

//get all items count
router.get('/count', getItemCount);

// Add a new Item
router.post('/add', addNewItem);

// get all items
router.get('/',getAllItems);

//get item using ID
router.get('/:id', getItemByID);

//Update item Using ID
router.patch('/update/:id',updateItemByID);

//Delete item using ID
router.delete('/delete/:id',authMiddleware, roleCheck(["admin"]),deleteItemById)




module.exports = router;
