const router = require('express').Router();
const { addWebUser,deleteWebUser,getAllWebUsers,login, forgotPassword, resetPassword, getUserFromToken, getWebUserDetails,updateWebUser} = require('../controller/web.user.controller');


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

//get User by ID
router.get('/get', getUserFromToken, getWebUserDetails);

//update user details
router.put('/update', getUserFromToken, updateWebUser);

module.exports = router;