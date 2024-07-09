const router = require('express').Router();
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
router.delete('/delete/:id',authMiddleware,roleCheck(["admin","inventory manager"]),deleteItemById)




module.exports = router;
