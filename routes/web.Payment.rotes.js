const router = require('express').Router();
const {Payment} = require('../controller/web.payment.js');

//Payment 
router.post('/', Payment);

module.exports = router;