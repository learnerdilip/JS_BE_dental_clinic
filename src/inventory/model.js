const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  // itemQuantity: { type: String },
  // purchaseDate: { type: Date },
  // expiryDate: { type: Date },
  dealersName: { type: String },
});

module.exports = mongoose.model("inventory", inventorySchema);
