const UserModel = require("../models/user.model");
const bcrypt=require("bcrypt");
const mongoose = require('mongoose')



// Create the login

async function login(req, res) {
    try {
       const user=await  UserModel.findByCredentials(req.body.userName,req.body.password)
      // const token=await user.generateAuthToken()
       //res.json({ success: true, data:user });
       res.send({user})
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Unauthorized" });
        
    }
}


// Adding new user
async function addUser(req, res) {
    try {
        const { userId, userName, firstName, lastName, password, gmail, dob, phoneNumber, address, idNumber, gender, role } = req.body;
        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }
        const dbRes = await UserModel.create({ userId, userName, firstName, lastName, password, gmail, dob, phoneNumber, address, idNumber, gender, role });
        console.log(dbRes);
        res.status(200).json({ success: true, data: dbRes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Get all users
const getAllUser=async function getUser(req,res){
    try {
        console.log(req.user);
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
        const user=await UserModel.findOne({_id:req.params.id});
        res.status(200).json({success:true, data:user})
    } catch (err) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }

}
 //Update user by userId

const updateUserById = async function updateUser(req, res) {
    try {
        const _id = req.params.id; // Extracting user ID from the URL path
        const { userId, userName, firstName, lastName, password, gmail, dob, phoneNumber, address, idNumber, gender, role } = req.body;
        const updateData = { userId, userName, firstName, lastName, password, gmail, dob, phoneNumber, address, idNumber, gender, role };
        
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Find the user by ID and update it
        const updatedUser = await UserModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}


//Delete user by userId
// const deleteUserById=async function deleteUser(req,res){
//     try {
//         let _id=req.params.id;
//         const userdelete  =await UserModel.findByIdAndDelete(_id)
//         res.status(200).json({success:true,data:userdelete})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({success:false,message:"Server Error"})
//     }
// }

const deleteUserById = async (req, res) => {
    try {
        const deleteUserById = await UserModel.findByIdAndDelete(req.params._id);

        if (!deleteUserById) 
            return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, message: 'User Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete item', error: err.message });
    }
}
// Assuming UserModel is your Mongoose model for users
// const deleteUserByUserId = async function deleteUser(req, res) {
//     try {
//         const userId = req.params.userId; // Assuming userId is passed as a route parameter
//         const userdelete = await UserModel.findOneAndDelete({ userId: userId });
//         if (userdelete) {
//             res.status(200).json({ success: true, data: userdelete });
//         } else {
//             res.status(404).json({ success: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// }


module.exports={addUser,getAllUser,getUserById,updateUserById,deleteUserById,login}