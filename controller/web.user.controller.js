const WebUserModel = require('../models/web.user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Middleware to extract user details from token
const getUserFromToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await WebUserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: "Failed to authenticate token" });
    }
};

// Controller function to add a new user
const addWebUser = async (req, res) => {
    try {
        const existingUser = await WebUserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }
        const existingUsername = await WebUserModel.findOne({ username: req.body.username });
        if (existingUsername) {
            return res.status(400).json({ status: "error", message: "User with this username already exists" });
        }
        const existingContactNumber = await WebUserModel.findOne({ contact : req.body.contactNumber });
        if (existingContactNumber) {
            return res.status(400).json({ status: "error", message: "User with this contact number already exists" });
        }



        const hashpassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new WebUserModel({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
            address: req.body.address,
            contactNumber: req.body.contactNumber
        });

        await newUser.save();
        return res.status(201).json({ status: "succes", message: "User added successfully" });
        
    } catch (error) {
        console.error('Error:', error.message);
        return res.json({ status: true, message: "Internal server error" });
    }
};


// Controller function to get all users
const getAllWebUsers = async (req, res) => {
    try {
        const allUsers = await WebUserModel.find();
        res.json(allUsers);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a user by ID
const deleteWebUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await WebUserModel.findByIdAndRemove(id);
        if (!deletedUser) {
            console.error('User not found!');
            return res.status(404).json({ message: "User not found" });
        }
        console.log('User deleted successfully!');
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    const webUser = await WebUserModel .findOne({email:email});
    if (!webUser) {
        return res.json({ status: "error", message: "User does not Register" });
    }
    const validPassword = await bcrypt.compare(password, webUser.password);
    if (!validPassword) {
        return res.json({ status: "error", message: "Invalid password" });
    }
    const token = jwt.sign({ id: webUser._id, username: webUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    return res.json({ status: "success", message: "Login success", token });
}


// Forgot Password Function
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const webUser = await WebUserModel.findOne({ email: email });
        if (!webUser) {
            return res.json({ status: "error", message: "User does not exist" });
        }
        const token = jwt.sign({ id: webUser._id, username: webUser.username }, process.env.JWT_SECRET, { expiresIn: '10m' });


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'harshanatharindu241@gmail.com',
                pass: 'kcbs gwci ifms vhne'
            }
        });

        var mailOptions = {
            from: 'harshanatharindu241@gmail.com',
            to: email, // Change to the user's email address
            subject: 'Reset Password',
            // Use backticks for string interpolation
            text: `http://localhost:3000/web/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: "error", message: "Failed to send email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ status: "success", message: "Email sent successfully" });
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


const resetPassword = async (req, res) => {
    const token = req.params.token; // Retrieve token from req.params.token
    const { password } = req.body;
    try {
        // Decode token using JWT
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Ensure the decoded token has the necessary properties
        if (!decoded ||!decoded.id) {
            return res.status(400).json({ status: "error", message: "Invalid or expired token" });
        }
        const id = decoded.id;

        // Hash the new password
        const hashpassword = await bcrypt.hash(password, 10);

        // Find the user by ID and update the password
        const user = await WebUserModel.findByIdAndUpdate(id, { password: hashpassword });
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        return res.json({ status: "success", message: "Password reset success" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error", message: "Invalid or expired token" });
    }
};

//get login user all details 
const getWebUserDetails = async (req, res) => {
    try {
        const webUser = await WebUserModel.findById(req.user.id);
        res.json(webUser);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addWebUser, getAllWebUsers, deleteWebUser, login , forgotPassword, resetPassword, getUserFromToken, getWebUserDetails};
