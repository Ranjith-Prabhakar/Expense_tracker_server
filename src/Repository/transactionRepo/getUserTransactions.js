const transactionModel = require('../../Models/transactionModel');
const ErrorObject = require('../../utils/ErrorObject');

const getUserTransactions = async ({ userId }, next) => {
  try {
    const transactions = await transactionModel.find({ userId })
    return transactions
  } catch (error) {
    return next(new ErrorObject(500, "Internal Error"));
  }
};

module.exports = { getUserTransactions };
