const express = require('express');
const router = express.Router();
const Cart = require('../models/Web.Cart.model');
const User = require('../models/web.user.model');
const Item = require('../models/inventory.model');
const Orders = require('../models/web.orders.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
   
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }
        req.userId = decoded.id; // Adjusted based on your token structure
        next();
    });
};

//Add item to cart
const addItemToCart = async (req, res) => {
    try {
        const { Item_id, itemDisplayName, image, quantity, price } = req.body;
        const userId = req.userId;

        const cartItem = new Cart({
            userId,
            item_id: Item_id,
            itemDisplayName,
            image,
            quantity,
            price
        });
        await cartItem.save();
        res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get cart items related to logged-in user
const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await Cart.find({ userId }).populate('item_id', 'itemDisplayName image');
        res.status(200).json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update cart quantity and price
const updateCart = async (req, res) => {
    try {
      const { item_id, quantity, price } = req.body;
      const userId = req.userId; // Assuming you have middleware that sets req.userId
  
      // Find the cart item and update its quantity and price
      const cartItem = await Cart.findOneAndUpdate(
        { _id: item_id, userId }, // Match by item ID and user ID
        { quantity, price },
        { new: true }
      );
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      console.log(cartItem);
      res.status(200).json(cartItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
//delete item from cart
const deleteItemFromCart = async (req, res) => {
    try {
        const { item_id } = req.body;
        const userId = req.userId;
        const cartItem = await Cart.findOneAndDelete({ _id: item_id, userId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Item deleted from cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get count of cart items with login user
const getCartItemsCount = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await Cart.find({ userId });
        res.status(200).json({ count: cartItems.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




//submit order with cash on delivery
const submitOrder = async (req, res) => {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshanatharindu241@gmail.com',
            pass: 'kcbs gwci ifms vhne'
        }
    });

    const parseOrderSummary = (orderSummary) => {
        // Split the string by new lines to get individual items
        return orderSummary.split('\n').map(item => {
            const [name, quantity, price] = item.split('=').map(part => part.trim());
            return { name, quantity, price };
        });
    };

    const sendOrderEmail = (email, orderSummary, totalPrice, name, address, city, zip, contactNumber) => {
        // Parse the order summary
        const items = parseOrderSummary(orderSummary);

        const mailOptions = {
            from: 'harshanatharindu241@gmail.com',
            to: email,
            subject: 'Successfully placed order',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Thank You For Your Order</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for your order. Here are the details:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Item</th>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.price ? 'Rs:' + item.price : 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p><strong>Total Price: Rs${totalPrice}.00</strong></p>
                    <p>Delivery Address:</p>
                    <p>${name}<br>${address}<br>${city}, ${zip}<br>Contact Number: ${contactNumber}</p>
                    <p>Your order will be delivered soon.</p>
                    <p>Thank You</p>
                </div>
            `
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    };

    try {
        const { name, address, email, city, zip, contactNumber, totalPrice, orderSummary, paymentMethod } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        const order = new Orders({
            userID: userId,
            name,
            email,
            address,
            city,
            zip,
            contactNumber,
            totalPrice,
            orderSummary,
            orderDate: new Date(),
            paymentMethod
        });
        await order.save();
        sendOrderEmail(email, orderSummary, totalPrice, name, address, city, zip, contactNumber);
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//delete all cart items after order placed
const deleteAllCartItems = async (req, res) => {
    try {
        const userId = req.userId; // Assuming you get user ID from auth middleware
        const result = await Cart.deleteMany({ userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No cart items found to delete' });
        }
        res.status(200).json({ message: 'All cart items deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all cash on delivery orders
const getCodOrders = async (req, res) => {
    try {
        const orders = await Orders.find({ paymentMethod: 'cashOnDelivery' });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { addItemToCart, 
                    verifyToken, 
                    getCartItems, 
                    updateCart, 
                    deleteItemFromCart, 
                    getCartItemsCount, 
                    submitOrder,
                    deleteAllCartItems,
                    getCodOrders
                };
