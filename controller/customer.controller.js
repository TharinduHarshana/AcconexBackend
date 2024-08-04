const Customer = require('../models/customer.model');

// Controller function to add a new customer
// http://localhost:8000/customer/add
async function addCustomer(req, res) {
    try {
        const { cusid, name, address, mobile } = req.body;

        // Check if cusid already exists
        const existingCustomerById = await Customer.findOne({ cusid });
        if (existingCustomerById) {
            return res.status(400).json({ success: false, message: "Customer with this ID already exists" });
        }

        // Check if mobile number already exists
        const existingCustomerByMobile = await Customer.findOne({ mobile });
        if (existingCustomerByMobile) {
            return res.status(400).json({ success: false, message: "Customer with this mobile number already exists" });
        }

        // Creating a new customer instance
        const newCustomer = new Customer({ cusid, name, address, mobile });

        // Saving the new customer to the database
        const savedCustomer = await newCustomer.save();

        // Sending success response
        res.status(201).json({ success: true, message: "New customer added successfully", data: savedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add new customer", error: error.message });
    }
}


// Get all customers
// http://localhost:8000/customer/
const getAllCustomers = async function (req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Get a single customer by customer id
// http://localhost:8000/customer/get/:id
const getCustomerById = async function (req, res) {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findOne({ cusid: customerId });
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Get a single customer by customer name
// http://localhost:8000/customer/getbyName/:name
const getCustomerByName = async function (req, res) {
    try {
        const customerName = req.params.name;
        const customer = await Customer.findOne({ name: customerName });
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Update customer by customer id
// http://localhost:8000/customer/update/:id
const updateCustomerById = async function (req, res) {
    try {
        const customerId = req.params.id;
        const updateData = req.body;
        const { mobile } = req.body;

        // Check if the new mobile number exists for a different customer
        if (mobile) {
            const existingCustomerByMobile = await Customer.findOne({ mobile });
            if (existingCustomerByMobile && existingCustomerByMobile.cusid !== customerId) {
                return res.status(400).json({ success: false, message: "Customer with this mobile number already exists" });
            }
            updateData.mobile = mobile;
        }

        const updatedCustomer = await Customer.findOneAndUpdate({ cusid: customerId }, updateData, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({ success: true, message: "Data updated successfully", data: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Delete customer by customer id
// http://localhost:8000/customer/delete/:id
const deleteCustomerById = async function (req, res) {
    try {
        const customerId = req.params.id;
        await Customer.findOneAndDelete({ cusid: customerId });
        res.status(200).json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Get registered customers count
const getCustomerCount = async function (req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, data: customers.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Exporting the controller functions
module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
    getCustomerByName,
    getCustomerCount
};
