const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuspendSaleSchema = new Schema({

    suspend_id:{
        type:String,
        unique:true,
        required:true  
    },
    Cashire_Name:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    customer_id:
    {
        type:String,
        required:true,
    },
    customer_name:{
        type:String,
        required:true

    },
    Item_ID:{
        type:String,
        required:true
    },
    Item_Name:{
        type:String,
        required:true
    },
    Qnt:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }

});

const Suspend_Sale=mongoose.model("Suspend_Sale",SuspendSaleSchema);

module.exports=Suspend_Sale;