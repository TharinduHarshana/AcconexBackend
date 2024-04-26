// middleware/roleCheckMiddleware.js
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
     if (allowedRoles.includes(req.user.role)) {
      // Log the user's role and the allowed roles
    console.log('User Role:', req.user.role); // Log the user's role
    console.log('Allowed Roles:', allowedRoles); // Log the allowed roles
       next();
     } else {
       res.status(403).json({ message: 'Forbidden' });
     }
  };
 };
 
 module.exports = roleCheck;
 