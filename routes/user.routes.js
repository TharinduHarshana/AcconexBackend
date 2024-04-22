const useRouter = require("express").Router();
const {
  login,
  addUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  checkUserId,
} = require("../controller/user.controller");

// create login
useRouter.post("/login", login);

// Add a user
useRouter.post("/add", addUser);

// Get all users
useRouter.get("/all", getAllUser);

// Get user by userId
useRouter.get("/:id", getUserById); // Changed the parameter name to ':id'

useRouter.get("/check/:userId",checkUserId)

// Update user by userId
useRouter.patch("/update/:id", updateUserById); // Changed the parameter name to ':id'

// Delete user by userId
useRouter.delete("/delete/:_id", deleteUserById);

// Exporting the router
module.exports = useRouter;
