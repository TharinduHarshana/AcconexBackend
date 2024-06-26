const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

//Defining the User Schema
const UserSchema = new Schema({
  userId: { type: String, unique: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true,trim:true },
  gmail: { type: String, required: true,trim:true },
  dob: { type: Date },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String },
  tokens:[{
    token:{type:String}
  }]
});

// Encrypt password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


UserSchema.statics.findByCredentials=async(userName,password)=>{
  
  const user= await UserModel.findOne({userName})
    if(!user){
        throw new Error()
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error()
    }
return user;

}
//generate token through user
// UserSchema.methods.generateAuthToken=async function(){
//   const user=this;
//   const token= jwt.sign({_id:user._id.toString()},"mysecret")
//   user.tokens=user.tokens.concat({token})

//   //sent the user database
//   await user.save()
//   return token;

// }

//Exporting the User model
const UserModel = model("User", UserSchema);
module.exports = UserModel;
