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
        
        console.log('Start of Day:', startOfDay);
        console.log('End of Day:', endOfDay);

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

//daily sales count 
const getDailysalesCount = async function(req, res) {
    try {
        const count = await Dailysales.countDocuments();
        res.status(200).json({ success: true, data: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const getMonthlyTotalSales = async (req, res) => {
    try {
      const monthlySales = await Dailysales.aggregate([
        {
          $addFields: {
            date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$datetime" } } }
          }
        },
        {
          $group: {
            _id: { $substrCP: ["$date", 0, 7] }, // Group by year-month
            totalAmount: { $sum: "$totalamount" },
            totalProfit: { $sum: "$profit" },
            totalLoss: { $sum: "$loss" }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
      res.status(200).json({ success: true, data: monthlySales });
    } catch (error) {
      console.error('Error fetching monthly total sales:', error);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  };

  const getWeeklyTotalSales = async (req, res) => {
    try {
      const weeklySales = await Dailysales.aggregate([
        {
          $addFields: {
            date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$datetime" } } }
          }
        },
        {
          $group: {
            _id: { $week: { $toDate: "$datetime" } }, // Group by week of the year
            totalAmount: { $sum: "$totalamount" },
            totalProfit: { $sum: "$profit" },
            totalLoss: { $sum: "$loss" }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
      res.status(200).json({ success: true, data: weeklySales });
    } catch (error) {
      console.error('Error fetching weekly total sales:', error);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  };
  
  
  const getByMonthTotalSales = async (req, res) => {
    try {
      const { month } = req.query; // Get the month from query parameters

      const monthlySales = await Dailysales.aggregate([
          {
              $addFields: {
                  // Convert datetime field to a formatted date string ("%Y-%m")
                  monthYear: {
                      $dateToString: { format: "%Y-%m", date: { $toDate: "$datetime" } }
                  }
              }
          },
          {
              $match: { monthYear: month } // Filter data for the specific month
          },
          {
              $group: {
                  _id: "$monthYear", // Group by the newly formatted date string
                  totalAmount: { $sum: "$totalamount" },
                  totalProfit: { $sum: "$profit" },
                  totalLoss: { $sum: "$loss" }
              }
          },
          {
              $sort: { "_id": 1 }
          },
          {
              $project: {
                  _id: 0,
                  monthYear: "$_id",
                  totalAmount: 1,
                  totalProfit: 1,
                  totalLoss: 1
              }
          }
      ]);

      // Log the monthly sales data
      monthlySales.forEach(sale => {
          console.log(`Month-Year: ${sale.monthYear}, Total Amount: ${sale.totalAmount}, Total Profit: ${sale.totalProfit}, Total Loss: ${sale.totalLoss}`);
      });

      res.status(200).json({ success: true, data: monthlySales });
  } catch (error) {
      console.error('Error fetching monthly total sales:', error);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
  };

  const generateSalesReport = async (req, res) => {
    const { date } = req.params; // Get the date from params
  
    try {
        const startDate = new Date(`${date}T00:00:00Z`);
        const endDate = new Date(`${date}T23:59:59Z`);
  
        console.log(`Generating sales report for date: ${date}`);
        console.log('Start datetime string:', startDate.toISOString());
        console.log('End datetime string:', endDate.toISOString());
  
        const salesReport = await Dailysales.aggregate([
            {
                $match: {
                    datetime: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$datetime" },
                        month: { $month: "$datetime" },
                        day: { $dayOfMonth: "$datetime" },
                        cashier: "$cashirename",
                        customer: "$customername"
                    },
                    totalSales: { $sum: "$totalamount" },
                    itemCount: { $sum: "$itemcount" },
                    items: { $push: "$Item_Names" }
                }
            }
        ]);
  
        if (salesReport.length === 0) {
            console.log('No sales data found for the specified date.');
            return res.status(404).json({ message: 'No sales data found for the specified date.' });
        }
  
        console.log('Sales report data:', salesReport);
        res.status(200).json(salesReport);
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

  
  
  
 
  






  
  
module.exports = { addDailysales, getAllDailysales, deleteDailysalesById, getDailysalesbyDate, getDailysalesCount,getMonthlyTotalSales,getWeeklyTotalSales,getByMonthTotalSales, generateSalesReport };
  