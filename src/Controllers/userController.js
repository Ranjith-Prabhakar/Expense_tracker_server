const { userSignupDB } = require("../Repository/userSignUp");
const { userLoginDB } = require("../Repository/userLogin");
const ErrorObject = require("../utils/ErrorObject");
const { addMembers } = require("../Repository/addMembers");
const { addTransactionDB } = require('../Repository/transactionRepo/addTransaction');
const { getUserTransactions } = require("../Repository/transactionRepo/getUserTransactions");

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
      const transactions = await getUserTransactions({ userId:user._id },next)
      res.status(200).json({ success: true, message: "User login has been successful", user, transactions });
    } else {
      return next(new ErrorObject(401, "Invalid credentials"));
    }
  } catch (error) {
    console.error("Error in userLogin controller:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};

const addMember = async (req, res, next) => {
  try {
    const { userId, userName, email } = req.body;
    console.log(userId, userName, email)
    if (!email || !userName || !userId) {
      return next(new ErrorObject(400, "All fields are required"));
    }

    const user = await addMembers({ userId, userName, email }, next);
    if (user) {
      res.status(200).json({ success: true, message: "Member has been added successfully", user });
    } else {
      return next(new ErrorObject(401, "Invalid credentials"));
    }
  } catch (error) {
    console.error("Error in userLogin controller:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};


const addTransaction = async (req, res, next) => {
  try {
    const { userId, modeOfTransaction, party, amount, narration } = req.body;
    console.log(userId, modeOfTransaction, party, amount, narration)
    if (!userId || !modeOfTransaction || !party || !amount || !narration) {
      return next(new ErrorObject(400, "All fields are required"));
    }

    const transactions = await addTransactionDB({ userId, modeOfTransaction, party, amount, narration }, next);
    if (transactions) {
      res.status(200).json({ success: true, message: "transaction has been recorded", transactions });
    } else {
      return next(new ErrorObject(401, "Invalid credentials"));
    }
  } catch (error) {
    console.error("Error in userLogin controller:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};


module.exports = { userSignup, userLogin, addMember, addTransaction };
