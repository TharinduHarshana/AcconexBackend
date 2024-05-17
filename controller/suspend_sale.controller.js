const SuspendSale = require('../models/suspend_sale.model');

// Controller function to add a new supend sale
// http://localhost:8000/suspendsale/add
async function addsuspend(req, res) {
    try {
        const { suspend_id,Cashire_Name,Date,customer_id, customer_name, Item_ID, Item_Name,Qnt,total } = req.body;

        const existingSuspendSale = await SuspendSale.findOne({ suspend_id });
        if (existingSuspendSale) {
            return res.status(400).json({ success: false, message: "Suspend sale with this ID already exists" });
        }

        const newSuspendSale = new SuspendSale({
            suspend_id,
            Cashire_Name,
            Date,
            customer_id,
            customer_name,
            Item_IDs:Item_ID,
            Item_Names:Item_Name,
            Qnt,
            total: parseFloat(total)  
        });

        const savedSuspendSale = await newSuspendSale.save();

        res.status(201).json({ success: true, message: "New suspend sale added successfully", data: savedSuspendSale });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add suspend sale", error: error.message });
    }
}

// Get all sales
// http://localhost:8000/suspendsale/
const getAllSuspensale = async function ( req,res) {
    try {
        const allSuspendsake = await SuspendSale.find();
        res.status(200).json({ success: true, data: allSuspendsake });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// Delete sale by sales id
// http://localhost:8000/suspendsale/delete/:id
const deleteSuspendSale = async function (req, res) {
    try {
        const POS_NO = req.params.id;
        await SuspendSale.findOneAndDelete({ POSNO: POS_NO });
        res.status(200).json({ success: true, message: "sale deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = { addsuspend ,getAllSuspensale,deleteSuspendSale};
