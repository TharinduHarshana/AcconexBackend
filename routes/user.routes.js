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
  updateProfile,
  getUserProfile,
} = require("../controller/user.controller");




// Public Routes
useRouter.post("/login",login);
useRouter.get("/logout",logout);

// Protected Routes

useRouter.post("/add",authMiddleware, roleCheck(["admin"]),addUser);
useRouter.get("/all",authMiddleware, roleCheck(["admin"]), getAllUser);
useRouter.get("/:id", getUserById); 
useRouter.get("/check/:userId", checkUserId);
useRouter.patch("/update/:id",updateUserById);
useRouter.delete("/delete/:_id", deleteUserById);

//Route for update profile
useRouter.patch(
  "/profile",
  authMiddleware,
  updateProfile
);

//get user profile data
useRouter.get("/edit/profile", authMiddleware, getUserProfile);

// Route for switching profile (only accessible by admin)
//useRouter.post("/switch-profile", authMiddleware, roleCheck(["admin"]), switchProfile);

// Exporting the router
module.exports = useRouter;
