const Customer = require('../models/sales.model');

// Controller function to add a new customer
// http://localhost:8000/sales/add
async function addCustomer(req, res) {
    try {
        // Extracting data from request body
        const { cusid, name, address, mobile } = req.body;

          // Check if cusid already exists
          const existingCustomer = await Customer.findOne({ cusid });
          if (existingCustomer) {
              return res.status(400).json({ success: false, message: "Customer with this ID already exists" });
          }
          
        // Creating a new customer instance
        const newCustomer = new Customer({
            cusid,
            name,
            address,
            mobile,
        });

        

        // Saving the new customer to the database
        const savedCustomer = await newCustomer.save();

        // Sending success response
        res.status(201).json({ success: true, message: "New customer added successfully", data: savedCustomer });
    } catch (error) {
        // Sending error response if there's any error
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add new customer", error: error.message });
    }
}

// Get all customers
// http://localhost:8000/sales/
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
// http://localhost:8000/sales/get/:id
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

// Update customer by customer id
// http://localhost:8000/sales/update/:id
const updateCustomerById = async function (req, res) {
    try {
        const customerId = req.params.id;
        const updateData = req.body; // Assuming req.body contains fields to be updated
        const updatedCustomer = await Customer.findOneAndUpdate({ cusid: customerId }, updateData, { new: true });
        res.status(200).json({ success: true, message: "Data updated successfully", data: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Delete customer by customer id
// http://localhost:8000/sales/delete/:id
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

// Exporting the controller functions
module.exports = { addCustomer, getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById };
