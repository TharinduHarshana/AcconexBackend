const {model,Schema}=require("mongoose")


//Defining the User Schema
const UserSchema=new Schema({
    userId:{type:String,unique:true},
    userName:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String},
    password:{type:String,required:true},
    gmail:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    address:{type:String,required:true},
    idNumber:{type:String,required:true},
    role:{type:String,required:true},

 })

//Exporting the User model
const UserModel=model("User",UserSchema);
module.exports=UserModel;
