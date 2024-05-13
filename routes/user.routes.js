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

// Route for user login
useRouter.post("/login", login);

// Route for user logout
useRouter.get("/logout", logout);

// Route for adding a new user
useRouter.post("/add", authMiddleware, roleCheck(["admin"]), addUser);

// Route for getting all users (restricted to admin role)
useRouter.get("/all", authMiddleware, roleCheck(["admin"]), getAllUser);

//Route for update profile
useRouter.patch(
  "/profile",
  authMiddleware,
  updateProfile
);

//get user profile data
useRouter.get("/edit/profile", authMiddleware, getUserProfile);

// Route for getting user by Id (restricted to admin role)
useRouter.get("/:id", authMiddleware, roleCheck(["admin"]), getUserById); // Changed the parameter name to ':id'

// Route for checking user by ID (restricted to admin role)
useRouter.get(
  "/check/:userId",
  authMiddleware,
  roleCheck(["admin"]),
  checkUserId
);

// Route for updating a user by ID (restricted to admin role)
useRouter.patch(
  "/update/:id",
  authMiddleware,
  roleCheck(["admin"]),
  updateUserById
);

// Route for deleting a user by ID (restricted to admin role)
useRouter.delete(
  "/delete/:_id",
  authMiddleware,
  roleCheck(["admin"]),
  deleteUserById
);

// Exporting the router
module.exports = useRouter;
