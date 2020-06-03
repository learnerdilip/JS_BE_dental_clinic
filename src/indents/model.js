const mongoose = require("mongoose");

const OrderItem = new mongoose.Schema({
  item: { type: String },
  quantity: { type: String },
  status: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

const IndentSchema = new mongoose.Schema({
  orderDate: { type: Date },
  dealer: { type: String },
  estimatedAmount: { type: Number },
  due: { type: Number, default: 0 },
  paid: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  paymentMode: { type: String },
  orderItems: { type: [OrderItem] },
});

module.exports = mongoose.model("indent", IndentSchema);
