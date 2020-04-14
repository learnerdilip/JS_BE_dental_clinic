const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  patient: { type: String, required: true, allowNull: false },
  currentDateTime: { type: Date, required: true, allowNull: false },
  description: { type: String },
  prescription: { type: String },
  cost: { type: Number },
  paid: { type: Number },
  balance: { type: Number },
  followupDateTime: { type: Date },
});

module.exports = mongoose.model("visits", VisitSchema);