const useRouter = require("express").Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const roleCheck = require("../Middlewares/role.check.middleware");
const { login, logout, switchProfile } = require("../controller/auth.controller");
const {
  addUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  checkUserId,
} = require("../controller/user.controller");



// Public Routes
useRouter.post("/login", login);
useRouter.get("/logout", logout);

// Protected Routes

useRouter.post("/add",addUser);
useRouter.get("/all", getAllUser);
useRouter.get("/:id", getUserById); // Changed the parameter name to ':id'
useRouter.get("/check/:userId", checkUserId);
useRouter.patch("/update/:id",updateUserById);
useRouter.delete("/delete/:_id", deleteUserById);

// Route for switching profile (only accessible by admin)
useRouter.post("/switch-profile", authMiddleware, roleCheck(["admin"]), switchProfile);

// Exporting the router
module.exports = useRouter;
