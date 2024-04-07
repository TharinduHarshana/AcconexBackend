const router = require('express').Router();
const {addNewItem ,getAllItems,updateItemByID } = require('../controller/web.inventory.controller');

// Add a new Item
router.post('/add', addNewItem);

// get all items
router.get('/',getAllItems);

// update item by id
router.patch('/update/:id',updateItemByID);

module.exports = router;
