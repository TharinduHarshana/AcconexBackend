const Dailysales = require('../models/daily_sales.model');

// Controller function to add a new sale
// http://localhost:8000/dailysales/add
async function addDailysales(req, res) {
    try {
        // Extracting data from request body
        const { POSNO,cashirename, datetime, customername,itemcount,paymentmethod,totalamount,totalcost,profit } = req.body;
          
        // Creating a new dailysales instance
        const newDailysales = new Dailysales({
            POSNO,
            cashirename,
            datetime,
            customername,
            itemcount,
            paymentmethod,
            totalamount,
            totalcost,
            profit
        });

        // Saving the new dailysales to the database
        const savedDailysales = await newDailysales.save();

        // Sending success response
        res.status(201).json({ success: true, message: "New sale added successfully", data: savedDailysales });
    } catch (error) {
        // Sending error response if there's any error
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add new sale", error: error.message });
    }
}


// Get all sales
// http://localhost:8000/dailysales/
const getAllDailysales = async function ( req,res) {
    try {
        const allDailysales = await Dailysales.find();
        res.status(200).json({ success: true, data: allDailysales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports= { addDailysales,getAllDailysales};
