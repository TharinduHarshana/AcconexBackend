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

useRouter.post("/add", authMiddleware,roleCheck(["admin"]),addUser);
useRouter.get("/all",authMiddleware,roleCheck(["admin"]), getAllUser);
useRouter.get("/:id",authMiddleware,roleCheck(["admin"]), getUserById); // Changed the parameter name to ':id'
useRouter.get("/check/:userId",authMiddleware, checkUserId);
useRouter.patch("/update/:id", authMiddleware,roleCheck(["admin"]),updateUserById);
useRouter.delete("/delete/:_id",authMiddleware,roleCheck(["admin"]), deleteUserById);

// Route for switching profile (only accessible by admin)
useRouter.post("/switch-profile", authMiddleware, roleCheck(["admin"]), switchProfile);

// Exporting the router
module.exports = useRouter;
