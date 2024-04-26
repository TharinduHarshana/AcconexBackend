
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
 try {
    // Extract the token from the cookie
    const token = req.cookies.token;
    console.log('Token:', token); // Log the extracted token

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log('Decoded Token:', decoded);

    // Find the user by ID
    const user = await UserModel.findById(decoded.id);
    console.log('User:', user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Set the user object in the request
    req.user = user;

    // Proceed to the next middleware or route handler
     next();
 } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
 }
};

module.exports = authMiddleware;

