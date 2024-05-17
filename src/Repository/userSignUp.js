const userModel = require('../Models/userModel');
const ErrorObject = require('../utils/ErrorObject');
const bcrypt = require('bcryptjs');

const userSignupDB = async ({ userName, email, password }, next) => {
  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      console.log("isExist")
      return next(new ErrorObject(400, "a User already exists with this Email"));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
      const user = await userModel.create({
        userName,
        email,
        password: hashedPassword
      });
      return user;
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ErrorObject(400, error.message));
    }
    return next(new ErrorObject(500, "Internal Error"));
  }
};





module.exports = { userSignupDB };
