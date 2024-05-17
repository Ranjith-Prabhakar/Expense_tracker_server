const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is missing"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is missing"],
  },
  password: {
    type: String,
    required: [true, 'password is missing']
  },
  members:[{userName:String,email:String}]
    
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
