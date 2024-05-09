const router = require('express').Router();
const { addWebUser,deleteWebUser,getAllWebUsers,login, forgotPassword, resetPassword} = require('../controller/web.user.controller');


//get all web users
router.get('/', getAllWebUsers);

//add web user
router.post('/register', addWebUser);

//delete web user
router.delete('/delete/:id', deleteWebUser);

//login
router.post('/login', login);

//forgot password
router.post('/frogotpassword', forgotPassword);

//reset password
router.post('/resetPassword/:token', resetPassword)

module.exports = router;