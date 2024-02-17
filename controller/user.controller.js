const UserModel = require("../models/user.model");
const bcrypt=require("bcrypt");

function login(req,res){
    res.json({msg:'login okay'})
}

//Adding new user
 async function addUser(req,res){
     
     try {
       
        const{userId,userName,firstName,lastName,password,gmail,phoneNumber,address,idNumber,role}=req.body;
        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }
        //Hash the password
        const passwordHash=await bcrypt.hash(password,12);
        const dbRes= await UserModel.create({userId,userName,firstName,lastName,password:passwordHash,gmail,phoneNumber,address,idNumber,role})
        res.status(200).json({success:true,data:dbRes})
     } catch (error) {
        console.log(error)
         res.status(500).json({success:false,message:"Server Error"})
     }
 }

//Get all users
const getAllUser=async function getUser(req,res){
    try {
        const users=await UserModel.find();
        res.status(200).json({success:true, data:users})

    } catch (err) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }

}
//Get a single user by userId
const getUserById=async function getUserId(req,res){
    try {
        const user=await UserModel.findOne({userId:req.params.id});
        res.status(200).json({success:true, data:user})
    } catch (err) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }

}
//Update user by userId
const updateUserById=async function updateUser(req,res){
    try {
        let userId=req.params.id;
        const{userName,firstName,lastName,password,gmail,phoneNumber,address,idNumber,role}=req.body;
        const updateData={userName,firstName,lastName,password,gmail,phoneNumber,address,idNumber,role};
        const update=await UserModel.findOneAndUpdate({userId:userId},updateData,{ new: true })

        res.status(200).json({success:true,data:update})

    } catch (err) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }
}

//Delete user by userId
const deleteUserById=async function deleteUser(req,res){
    try {
        let userId=req.params.id;
        const userdelete  =await UserModel.findOneAndDelete({userId:userId})
        res.status(200).json({success:true,data:userdelete})
    } catch (error) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }
}

module.exports={login,addUser,getAllUser,getUserById,updateUserById,deleteUserById}