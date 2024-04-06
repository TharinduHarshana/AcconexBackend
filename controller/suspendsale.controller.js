const Suspend_Sale = require('../models/suspend_sale.model');

async function addsuspend(req,res)
{
    try{

        const {customer_id, customer_name,suspend_id,bill_id,total}=req.body;

        const existingCustomer = await Suspend_Sale.findOne({ customer_id });
        if (existingCustomer) {
            return res.status(400).json({ success: false, message: "Customer with this ID already exists" });
        }

        const existingSuspend_Sale = await Suspend_Sale.findOne({ suspend_id });
        if (existingSuspend_Sale) {
            return res.status(400).json({ success: false, message: " suspend sale  with this ID already exists" });
        }
        
        const existingBill = await Suspend_Sale.findOne({ bill_id });
        if (existingBill) {
            return res.status(400).json({ success: false, message: "Bill with this ID already exists" });
        }
        
        const newSuspend_Sale = new Suspend_Sale({
            customer_id,
            customer_name,
            suspend_id,
            bill_id,
            total
        });
        
    }catch(error){
            console.error(error)
            res.status(500).json({success:false,message: "Fail to add into suspend sales",error:error.message});
    }
}