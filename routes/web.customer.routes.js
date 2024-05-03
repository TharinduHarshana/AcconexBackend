const router = require('express').Router();
const {registerWebCustomer,loginWebCustomer}= require('../controller/web.customer.controller');

router.post('/register',registerWebCustomer);
router.post('/login',loginWebCustomer);

module.exports = router;