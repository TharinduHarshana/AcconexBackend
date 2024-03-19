const router = require('express').Router();
const {addNewItem} = require('../controller/inventory.controller');

router.post('/add',addNewItem);

module.exports = router;