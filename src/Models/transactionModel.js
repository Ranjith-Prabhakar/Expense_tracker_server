const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is missing"],
  },
  partyName: {
    type: String,
    required: [true, "partyName is missing"],
  },
  modeOfTransaction: {
    type: String,
    required: [true, 'modeOfTransaction is missing']
  },
  amount: {
    type: Number,
    required: [true, 'amount is missing']
  }, 
  narration: {
    type: String,
    required: [true, 'narration is missing']
  },

}, { timestamps: true });

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
