const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

//Defining the User Schema
const UserSchema = new Schema({
  userId: { type: String, unique: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  //email: { type: String, required: true, trim: true, match: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/ },
  password: { type: String, required: true,trim:true },
  gmail: { type: String, required: true,trim:true },
  dob: { type: Date },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'inventory manager', 'sales staff', 'cashier'], default: 'user' },
  
});

// Encrypt password before saving
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isNew || user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// UserSchema.statics.findByCredentials=async(userName,password)=>{
  
//   const user= await UserModel.findOne({userName})
//     if(!user){
//         throw new Error()
//     }
//     const isMatch= await bcrypt.compare(password,user.password)
//     if(!isMatch){
//         throw new Error()
//     }
// return user;

// }

//new login

// Pre-save hook to hash the password if it's modified
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
     this.password = await bcrypt.hash(this.password, 10);
  }
  next();
 });



const UserModel = model("User", UserSchema);
module.exports = UserModel;
