const roleCheck = (allowedRoles) => {
  // Check if the user's role is included in the allowed roles
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      // Log the user's role and the allowed roles
      console.log("User Role:", req.user.role); // Log the user's role
      console.log("Allowed Roles:", allowedRoles); // Log the allowed roles
      // If user's role is allowed, proceed to the  route handler
      next();
    } else {
      // If user's role is not allowed, return forbidden error
      res.status(403).json({ message: "Forbidden" });
    }
  };
};
// Exporting the role check middleware
module.exports = roleCheck;
