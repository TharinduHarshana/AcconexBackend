const UserModel = require("../models/user.model");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    const user = await UserModel.findOne({ userName });
    
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect password or username" });
    }
    
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res
        .status(401)
        .json({ message: "Incorrect password or username" });
    }
    // Generating JWT token
    const token = jwt.sign(
      // Payload with user ID and role
      { id: user._id, role: user.role },
      // Secret key for signing the token
      process.env.TOKEN_KEY,
      // Token expiration time
      { expiresIn: "86400s" }
    );

    res.cookie("token", token, {
      // Cookie cannot be accessed by client-side scripts
      httpOnly: true,
      // Cookie only sent over HTTPS, set this to false if not using HTTPS
      secure: true,
      //secure: process.env.NODE_ENV === 'production',
      sameSite: "none", // Cookie is sent on cross-origin requests
    });
    // Sending success response
    return res
      .status(200)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    // Passing error to error handler middleware
    next(error);
    // Sending internal server error response
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  // Clearing the token cookie
  res.clearCookie("token");
  // Sending logout success response
  return res.status(200).json({ message: "Logged out successfully" });
};
// const logout = (req, res) => {
//   // Clearing the token cookie
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//   });
//   // Sending logout success response
//   return res.status(200).json({ message: "Logged out successfully" });
// };


const switchProfile = async (req, res) => {
  const { userId, newRole } = req.body;
  console.log("Received switch profile request for userId:", userId, "with newRole:", newRole);

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.error("User not found for userId:", userId);
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;
    await user.save();
    console.log("Profile switched successfully for userId:", userId);
    res.json({ message: 'Profile switched successfully', user });
  } catch (error) {
    console.error("Error switching profile:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Exporting login and logout functions
module.exports = { login,logout,switchProfile };