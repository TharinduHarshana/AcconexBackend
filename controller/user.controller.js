const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Create the login

async function login(req, res) {
  try {
    const user = await UserModel.findByCredentials(
      req.body.userName,
      req.body.password
    );
    // const token=await user.generateAuthToken()
    //res.json({ success: true, data:user });
    res.send({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}


async function addUser(req, res) {
  try {
    const {
      userId,
      userName,
      firstName,
      lastName,
      password,
      gmail,
      dob,
      phoneNumber,
      address,
      idNumber,
      gender,
      role,
    } = req.body;

    // Check if any required field is missing
    if (!userId || !userName || !firstName || !lastName || !password || !gmail || !dob || !phoneNumber || !address || !idNumber || !gender || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if userId already exists
    const existingUser = await UserModel.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ msg: "User ID already exists" });
    }

    // Create new user
    const newUser = await UserModel.create({
      userId,
      userName,
      firstName,
      lastName,
      password,
      gmail,
      dob,
      phoneNumber,
      address,
      idNumber,
      gender,
      role,
    });
    
    console.log("New user added:", newUser);
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


//Get all users
const getAllUser = async function getUser(req, res) {
  try {
    console.log(req.user);
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//Get a single user by userId

// const getUserById = async function getUserId(req, res) {
//   try {
//     const userId = req.params.id;
//     const user = await UserModel.findOne({userId:userId})
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.status(200).json({ success: true, data: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
//Get a single user by userId
const getUserById=async function getUserId(req,res){
  try {
      const user=await UserModel.findById({_id:req.params.id});
      res.status(200).json({success:true, data:user})
  } catch (err) {
      console.log(err);
      res.status(500).json({success:false,message:"Server Error"})
  }

}



// const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id; // Assuming 'id' is extracted from request parameters
//     const userExist = await UserModel.findById(id); // Assuming 'User' model is defined elsewhere

//     if (!userExist) {
//       return res.status(404).json({ msg: "User is not found" });
//     }

//     res.status(200).json(userExist);
//   } catch (error) {
//     // It's generally a good practice to handle errors, at least logging them
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

//Update user by userId

const updateUserById = async function updateUser(req, res) {
  try {
    const _id = req.params.id; // Extracting user ID from the URL path
    const { userId, firstName, phoneNumber, role } = req.body;
    const updateData = { userId, firstName, phoneNumber, role };

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    // Find the user by ID and update it
    const updatedUser = await UserModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// const updateUserByUserId = async function updateUser(req, res) {
//   try {
//     const userId = req.params.id; // Extracting user ID from the URL path
//     const { firstName, phoneNumber, role } = req.body;
//     const updateData = { firstName, phoneNumber, role };

//     // Find the user by userId and update it
//     const updatedUser = await UserModel.findOneAndUpdate({ userId }, updateData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, data: updatedUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };






const deleteUserById = async (req, res) => {
  try {
    const deleteUserById = await UserModel.findByIdAndDelete(req.params._id);

    if (!deleteUserById)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete item",
        error: err.message,
      });
  }
};


module.exports = {
  addUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
};

