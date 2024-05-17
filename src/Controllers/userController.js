const { userSignupDB } = require("../Repository/userSignUp");
const ErrorObject = require("../utils/ErrorObject");

const userSignup = async (req, res, next) => {
  try {
    console.log("userSignup");
    const { userName, email, password } = req.body;
    console.log(userName, email, password, "------");

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

module.exports = { userSignup };
