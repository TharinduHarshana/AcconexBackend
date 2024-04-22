// const Suspend_Sale = require('../models/suspend_sale.model');

// async function addsuspend(req, res) {
//     try {
//         const { customer_id, customer_name, suspend_id, bill_id, total } = req.body;

//         const existingCustomer = await Suspend_Sale.findOne({ customer_id });
//         if (existingCustomer) {
//             return res.status(400).json({ success: false, message: "Customer with this ID already exists" });
//         }

//         const existingSuspendSale = await Suspend_Sale.findOne({ suspend_id });
//         if (existingSuspendSale) {
//             return res.status(400).json({ success: false, message: "Suspend sale with this ID already exists" });
//         }

//         const existingBill = await Suspend_Sale.findOne({ bill_id });
//         if (existingBill) {
//             return res.status(400).json({ success: false, message: "Bill with this ID already exists" });
//         }

//         const newSuspendSale = new Suspend_Sale({
//             customer_id,
//             customer_name,
//             suspend_id,
//             bill_id,
//             total
//         });

//         const savedSuspendSale = await newSuspendSale.save();

//         res.status(201).json({ success: true, message: "New suspend sale added successfully", data: savedSuspendSale });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to add suspend sale", error: error.message });
//     }
// }

// module.exports = { addsuspend };
