const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  type: { type: String },
  date: { type: Date },
  paidTo: { type: String },
  amountDue: { type: Number },
  amountPaid: { type: Number },
  balAmount: { type: Number },
});

module.exports = mongoose.model("expenses", ExpenseSchema);
