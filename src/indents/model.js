const mongoose = require("mongoose");

const IndentSchema = new mongoose.Schema({
  item: { type: String },
  qytBought: { type: Number },
  purchaseDate: { type: Date },
  dealersName: { type: String },
  totalCost: { type: Number },
  paid: { type: Number },
  balance: { type: Number },
});

module.exports = mongoose.model("indents", IndentSchema);
