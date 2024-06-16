const useRouter = require("express").Router();
const { login, logout } = require("../controller/auth.controller");
const {
  addUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  checkUserId,
  updateProfile,
  getUserProfile,
} = require("../controller/user.controller");

// Route for user login
useRouter.post("/login", login);

// Route for user logout
useRouter.get("/logout", logout);

// Route for adding a new user
useRouter.post("/add", addUser);

// Route for getting all users (restricted to admin role)
useRouter.get("/all", getAllUser);

//Route for update profile
useRouter.patch("/profile", updateProfile);

//get user profile data
useRouter.get("/edit/profile", getUserProfile);

// Route for getting user by Id (restricted to admin role)
useRouter.get("/:id", getUserById); // Changed the parameter name to ':id'

// Route for checking user by ID (restricted to admin role)
useRouter.get("/check/:userId", checkUserId);

// Route for updating a user by ID (restricted to admin role)
useRouter.patch("/update/:id", updateUserById);

// Route for deleting a user by ID (restricted to admin role)
useRouter.delete("/delete/:_id", deleteUserById);

// Exporting the router
module.exports = useRouter;
