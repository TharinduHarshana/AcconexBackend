const router = require('express').Router();
const {addNewItem ,getAllItems , getItemByID , updateItemByID , deleteItemById} = require('../controller/inventory.controller');

// Add a new Item
router.post('/add', addNewItem);

// get all items
router.get('/',getAllItems);

//get item using ID
router.get('/:id', getItemByID);

//Update item Using ID
router.patch('/update/:id',updateItemByID);

//Delete item using ID
router.delete('/delete/:id',deleteItemById)


module.exports = router;
