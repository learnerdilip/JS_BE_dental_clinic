const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  type: { type: String, isNull: false, required: true },
  date: { type: Date, isNull: false, required: true },
  paidTo: { type: String, isNull: false, required: true },
  paymentMode: { type: String },
  amountDue: { type: Number, isNull: false, required: true },
  amountPaid: { type: Number },
  balAmount: { type: Number },
});

module.exports = mongoose.model("expenses", ExpenseSchema);
