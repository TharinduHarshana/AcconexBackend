const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const WebCustomer = require('../models/web.customer.model');

// Add the web customer to the database
const registerWebCustomer = async (req, res) => {
    const { firstname, lastname, address, contactnumber, email, username, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const customer = new WebCustomer({
        firstname,
        lastname,
        address,
        contactnumber,
        email,
        username,
        password: hashedPassword,
    });

    try {
        await customer.save();
        res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check and validate login data and user
const loginWebCustomer = async (req, res) => {
    const { username, password } = req.body;
    try {
        const customer = await WebCustomer.findOne({ username: username });
        if (!customer) {
            onsole.log("Customer not found");
            return res.status(404).json({ message: "Customer not found" });
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: customer.id, role: customer.role }, 
                                "jwt-secret-key", { expiresIn: '3h' });
        res.cookie('token', token)
        return res.status(200).json({ message: "Customer logged in successfully" });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    registerWebCustomer,
    loginWebCustomer
};
