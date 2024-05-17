const transactionModel = require('../../Models/transactionModel');
const ErrorObject = require('../../utils/ErrorObject');

const addTransactionDB = async ({ userId, modeOfTransaction, party, amount, narration }, next) => {
  try {
    const transaction = await transactionModel.create({ userId, modeOfTransaction, partyName:party, amount: parseInt(amount), narration })
    console.log("transaction", transaction)
    const transactions = await transactionModel.find({ userId, partyName: party }) 
    console.log("transactions", transactions)
    return transactions 
  } catch (error) {
    console.error("Error in addMembers:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};

module.exports = { addTransactionDB };
