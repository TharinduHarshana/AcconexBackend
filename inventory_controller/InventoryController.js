const Inventory = require('../inventory_models/InventoryModels'); //get module
const {check, validationResult} = require('express-validator'); //validation model import

//add new item
const addNewItem =async(req,res) =>{
    check('displayName').notEmpty().withMesseage('Please enter the Display name ');
    check('itemName').notEmpty().withMesseage('Please enter the Item name ');
    check('quantity').notEmpty().withMesseage('Please enter Item quantity ');
    check('costPrice').notEmpty().withMesseage('Please enter Cost price ');
    check('sellingPrice').notEmpty().withMesseage('Please enter Selling price ');
    check('category').notEmpty().withMesseage('Please select category ');

        //return validation errors
        (req,res,next) => {
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({success:false, error: error.array()});
            }
            next();
        }
    
    //addidng new item to databse
    try{
        const item = new Inventory(req.body);
        const result = await item.save();

        if(result)
        res.status(201).json({success:true, message: "New item added successfully"});
        res.status(400).json({success:true, message:"Faliure in adding new item"});
    }catch(err){
        res.status(500).json({success:false,message: err.message});
    }

}