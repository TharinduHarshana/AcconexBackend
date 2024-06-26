const router = require('express').Router();
const {getAllItems,updateItemByID, getCategoryWiseItems } = require('../controller/web.inventory.controller');


// get all items
router.get('/',getAllItems);

// get category items
router.get('/:category', getCategoryWiseItems);

module.exports = router;
