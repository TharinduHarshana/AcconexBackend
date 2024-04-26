// controllers/authController.js
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
 try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect password or username' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: 'Incorrect password or username' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_KEY, {
      expiresIn: '1d', // Token expires in 1 days
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: "User logged in successfully", success: true });
 } catch (error) {
    console.error(error);
    next(error)
    return res.status(500).json({ message: 'Internal server error' });
 }
};

const logout = (req, res) => {
 res.clearCookie('token');
 return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { login, logout };
