const router = require('express').Router();
const {getAllItems, getCategoryWiseItems,getSearchResults } = require('../controller/web.inventory.controller');


// get all items
router.get('/',getAllItems);

// get category items
router.get('/:category', getCategoryWiseItems);

// get search results
router.get('/search/:value', getSearchResults);

module.exports = router;
