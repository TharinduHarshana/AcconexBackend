const Dailysales = require('../models/daily_sales.model');

// Controller function to add a new sale
// http://localhost:8000/dailysales/add
async function addDailysales(req, res) {
    try {
        // Extracting data from request body
        const { POSNO,cashirename, datetime, customername,itemcount,Item_IDs,Item_Names,Qnt,Prices,Discounts,paymentmethod,totalamount,totalcost,profit,loss} = req.body;
          
        // Creating a new dailysales instance
        const newDailysales = new Dailysales({
            POSNO,
            cashirename,
            datetime,
            customername,
            itemcount,
            Item_IDs,
            Item_Names,
            Qnt,
            Prices,
            Discounts,
            paymentmethod,
            totalamount,
            totalcost,
            profit,
            loss
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
const getDailysalesbyDate = async function(req, res) {
    try {
        const dateParam = req.params.date; // Example: "2024-07-08"
        
        // Define the start and end of the day as strings
        const startOfDay = `${dateParam} 00:00:00`;
        const endOfDay = `${dateParam} 23:59:59`;
        

        // Find all records where the datetime falls within the specified date range
        const alldailysalesdate = await Dailysales.find({
            datetime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (alldailysalesdate.length === 0) {
            return res.status(404).json({ success: false, message: "Daily sales not found" });
        }

        res.status(200).json({ success: true, data: alldailysalesdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Delete sale by sales id
// http://localhost:8000/dailysales/delete/:id
const deleteDailysalesById = async function (req, res) {
    try {
        const POS_NO = req.params.id;
        await Dailysales.findOneAndDelete({ POSNO: POS_NO });
        res.status(200).json({ success: true, message: "sale deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
}


module.exports= { addDailysales,getAllDailysales,deleteDailysalesById,getDailysalesbyDate};
