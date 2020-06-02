const mongoose = require("mongoose");

const OrderItem = new mongoose.Schema({
  item: { type: String },
  quantity: { type: String },
  status: { type: String },
  price: { type: Number },
});

const IndentSchema = new mongoose.Schema({
  orderDate: { type: Date },
  dealer: { type: String },
  estimatedAmount: { type: Number },
  paid: { type: Number },
  balance: { type: Number },
  paymentMode: { type: String },
  orderItems: { type: [OrderItem] },
});

module.exports = mongoose.model("indent", IndentSchema);
