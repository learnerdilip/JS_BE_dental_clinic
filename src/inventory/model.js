const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true, allowNull: false },
  itemSpec: { type: String },
  category: { type: String, required: true, allowNull: false },
  dealer: { type: String },   
  useQyt: { type: String },
  stockQyt: { type: String },
  inUseExpiry: { type: Date },
  stockExpiry: { type: Date },
});

module.exports = mongoose.model("inventory", inventorySchema);
