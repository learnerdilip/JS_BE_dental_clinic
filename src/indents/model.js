const mongoose = require("mongoose");

const IndentItem = new mongoose.Schema({
  item: { type: String },
  quantity: { type: String },
  dealerName: { type: String },
  price: { type: Number },
  itemStatus: { type: String },
});

const IndentSchema = new mongoose.Schema({
  documentDate: { type: Date },
  orderItems: { type: [IndentItem] },
  billAmount: { type: Number },
  paid: { type: Number },
  balance: { type: Number },
  paymentMode: { type: String },
});

module.exports = mongoose.model("indent", IndentSchema);
