// Import the UserModel from the models directory
const UserModel = require("../models/user.model");
// Import the bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Import the mongoose library for database operations
const mongoose = require("mongoose");

// Function to add a new user
async function addUser(req, res) {
  try {
    // Destructure the request body to get user details
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
    if (
      !userId ||
      !userName ||
      !firstName ||
      !lastName ||
      !password ||
      !gmail ||
      !dob ||
      !phoneNumber ||
      !address ||
      !idNumber ||
      !gender ||
      !role
    ) {
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

// Function to get all user
const getAllUser = async function getUser(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Function to get a single user by userId
const getUserById = async function getUserId(req, res) {
  try {
    const user = await UserModel.findById({ _id: req.params.id });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Function to check if a userId exists
async function checkUserId(req, res) {
  try {
    const userExist = await UserModel.findOne({ userId: req.params.userId });
    if (userExist) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to update a user by userId
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

// Function to delete a user by id
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
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: err.message,
    });
  }
};


//update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, phoneNumber, email, address, birthday, idNumber } = req.body;

//     let updateFields = {
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       address,
//       birthday,
//       idNumber
//     };

//     // Check if a file is uploaded
//     if (req.file) {
//       updateFields.profilePicture = req.file.path; // Assuming you're storing the file path in the database
//     }

//     // Update user profile
//     await UserModel.findByIdAndUpdate(req.user._id, updateFields);

//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const updateProfile=async(req,res)=>{
  try{
  const { id } = req.user; // Assuming the user object is attached to the request by the auth middleware
    const { firstName, lastName, phoneNumber, email, address, birthday, idNumber,password, profilePicture } = req.body;
    // Convert the birthday to the required format
    const formattedBirthday = birthday? new Date(birthday).toISOString().split('T')[0] : null;

    // Find the user by ID
    const user = await UserModel.findById(id);

    // Update the user's information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gmail = email || user.gmail;
    user.address = address || user.address;
    user.birthday = formattedBirthday;
    user.idNumber = idNumber || user.idNumber;
    user.password=password|| user.password
    if (profilePicture) {
      user.profilePicture = profilePicture; // Assuming you have a way to handle file uploads
    }

    // Save the updated user
    await user.save();

    // Return success response
    res.status(200).json({ message: "Profile updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id); // Assuming req.user._id is populated by authMiddleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Export the functions for use in other parts of the application
module.exports = {
  addUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkUserId,
  updateProfile,getUserProfile
};
