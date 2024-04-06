const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(MONGO_URI);

autoIncrement.initialize(connection);

const SuspendSaleSchema = new Schema({

    customer_id:
    {
        type:String,
        unique: true,
        required:true,
    },
    customer_name:{
        type:String,
        required:true

    },
    suspend_id:{
        type:String,
        unique:true,
        required:true  
    },
    bill_id:{
        type:String,
        unique:true,
        required:true
    },
    total:{
        type:Number,
        required:true
    }

});

SuspendSaleSchema.plugin(autoIncrement.plugin,{
        model:'Suspend_Sale',
        field: 'suspend_id',
        startAt:1,
        incrementBy:1,
        prefix :'ss0'
});

SuspendSaleSchema.plugin(autoIncrement.plugin,{
    model:'Suspend_Sale',
    field:'bill_id',
    startAt:1,
    incrementBy:1,
    prefix:'bid00'
});

const Suspend_Sale=mongoose.model("Suspend_Sale",SuspendSaleSchema);

module.exports=Suspend_Sale;