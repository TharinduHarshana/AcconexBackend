const itemRouter = require('express').Router();
const {addItem} = require('../controller/inventory.controller');
//const { router } = require('../server');

//add
itemRouter.post('/add',addItem);
//router.length()

module.exports = itemRouter;