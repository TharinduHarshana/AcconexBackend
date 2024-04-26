const useRouter = require("express").Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");
const { login, logout } = require("../controller/auth.controller");
const {
  
  addUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  checkUserId,
} = require("../controller/user.controller");

// create login
//useRouter.post("/login", login);

useRouter.post("/login",login);
useRouter.get("/logout",logout);

//Add a user
//useRouter.post("/add", addUser);

//role and token
useRouter.post("/add",authMiddleware,roleCheck(['admin']),addUser);

// Get all users/
//useRouter.get("/all",getAllUser);

useRouter.get("/all",authMiddleware,roleCheck(['admin']),getAllUser);//

// Get user by userId
useRouter.get("/:id", getUserById); // Changed the parameter name to ':id'

useRouter.get("/check/:userId",checkUserId)

// Update user by userId
useRouter.patch("/update/:id", updateUserById); // Changed the parameter name to ':id'

// Delete user by userId
useRouter.delete("/delete/:_id", deleteUserById);

// Exporting the router
module.exports = useRouter;
