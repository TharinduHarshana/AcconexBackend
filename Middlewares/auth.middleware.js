// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user.model");

// const authMiddleware = async (req, res, next) => {
//   try {

//     console.log("Cookies:", req.cookies);
//     // Extract the token from the cookie
//     const token = req.cookies.token;
//     console.log("Token:", token); // Log the extracted token

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     // Verify the token
//     //const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//     //console.log('Decoded Token:', decoded);
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//     if (decoded.exp < Date.now() / 1000) {
//       return res.status(401).json({ message: "Unauthorized: Token expired" });
//     }
//     console.log("Decoded Token:", decoded);

//     // Find the user by ID
//     const user = await UserModel.findById(decoded.id);
//     console.log("User:", user);
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }

//     // Set the user object in the request
//     req.user = user;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token verification
const UserModel = require("../models/user.model"); // Importing the User model

const authMiddleware = async (req, res, next) => {
  try {
    // Logging the cookies received in the request
    console.log("Cookies:", req.cookies);
    // Extract the token from the cookie
    const token = req.cookies.token;
    // Logging the extracted token
    console.log("Token:", token);

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // Check if token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    // Logging the decoded token
    console.log("Decoded Token:", decoded);

    // Find the user by ID
    const user = await UserModel.findById(decoded.id);
    // Logging the user object
    console.log("User:", user);
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Set the user object in the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    // Return unauthorized error if token is invalid
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
// Exporting the authentication middleware
module.exports = authMiddleware;
