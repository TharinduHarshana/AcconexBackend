const { model, Schema } = require("mongoose"); // Import the model and Schema objects from Mongoose
const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing
const jwt = require("jsonwebtoken");


// Define a new Schema for the User model

const UserSchema = new Schema({
  userId: { type: String, unique: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true, trim: true },
  gmail: { type: String, required: true, trim: true },
  dob: { type: Date },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  gender: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user", "inventory manager", "sales staff", "cashier","web admin"],
    default: "user",
  },
  imageLink: {type:String},
});

// Define a pre-save hook to hash the password before saving the user to the database
UserSchema.pre("save", async function (next) {
  
  if (this.isModified("password")) {
    // If so, hash the password using bcrypt with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  // Proceed to the next middleware
  next();
});

// Create a model from the UserSchema, named "User"
const UserModel = model("User", UserSchema);
// Export the UserModel 
module.exports = UserModel;


