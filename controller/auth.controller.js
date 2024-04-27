const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // Destructuring username and password from request body
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Finding user by username
    const user = await UserModel.findOne({ userName });
    // If user doesn't exist, return error
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect password or username" });
    }
    // Comparing hashed password
    const auth = await bcrypt.compare(password, user.password);
    // If password doesn't match, return error
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
      { expiresIn: "1h" }
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
// Exporting login and logout functions
module.exports = { login, logout };
