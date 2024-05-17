const userModel = require('../Models/userModel');
const ErrorObject = require('../utils/ErrorObject');
const bcrypt = require('bcryptjs');

const userLoginDB = async ({ email, password }, next) => {
  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      isPasswordMatch = await bcrypt.compare(password, isExist.password)
      if (isPasswordMatch) {
        return isExist
      }
    } else {
      return next(new ErrorObject(400, "Password mis match"));
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ErrorObject(400, error.message));
    }
    return next(new ErrorObject(500, "Internal Error"));
  }
}

module.exports = {userLoginDB };