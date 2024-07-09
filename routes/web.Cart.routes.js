const express = require('express');
const router = express.Router(); // Define router object

const { addItemToCart, 
    verifyToken,
    getCartItems,updateCart,
    deleteItemFromCart,
     getCartItemsCount,
     submitOrder,
     deleteAllCartItems,
     getCodOrders
      } = require('../controller/web.Cart.controller');
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");

// Add item to cart
router.post('/add',verifyToken, addItemToCart);

// Get cart items
router.get('/get',verifyToken,getCartItems);

//update cart quantity and price
router.put('/update', verifyToken, updateCart);

//delete item from cart
router.delete('/delete', verifyToken, deleteItemFromCart);

//get count of cart items with login user
router.get('/count', verifyToken, getCartItemsCount);

//submit order
router.post('/submit', verifyToken, submitOrder);

//delete all cart items
router.delete('/deleteAll', verifyToken, deleteAllCartItems);

//get all cash on delivery orders
router.get('/codOrders',authMiddleware,roleCheck(["admin","web admin"]), getCodOrders);

module.exports = router;
