const router = require('express').Router();
const {addNewItem ,getAllItems,updateItemByID, getCategoryWiseItems } = require('../controller/web.inventory.controller');


// get all items
router.get('/',getAllItems);

// get category items
router.get('/:category', getCategoryWiseItems);

// update item by id
router.patch('/update/:id',updateItemByID);

module.exports = router;
