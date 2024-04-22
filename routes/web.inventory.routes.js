const router = require('express').Router();
const {getAllItems} = require('../controller/web.inventory.controller');


// get all items
router.get('/',getAllItems);

module.exports = router;
