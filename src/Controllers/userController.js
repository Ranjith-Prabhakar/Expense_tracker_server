const { userSignupDB, userLoginDB } = require("../Repository/userSignUp");
const ErrorObject = require("../utils/ErrorObject");

const userSignup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return next(new ErrorObject(400, "All fields are required"));
    }
    const user = await userSignupDB({ userName, email, password }, next);
    if (user) {
      res.status(200).json({ success: true, message: "User has been created" });
    }
  } catch (error) {
    return next(new ErrorObject(500, "Internal Error"));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorObject(400, "All fields are required"));
    }

    const user = await userLoginDB({ email, password }, next);
    if (user) {
      
      res.status(200).json({ success: true, message: "User login has been successful", user });
    } else {
      return next(new ErrorObject(401, "Invalid credentials"));
    }
  } catch (error) {
    console.error("Error in userLogin controller:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};




module.exports = { userSignup, userLogin, isUserLogin };
