const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  patient: { type: String, required: true, allowNull: false },
  date: { type: Date, required: true, allowNull: false },
  description: { type: String },
  prescription: { type: String },
  cost: { type: Number },
});

module.exports = mongoose.model("visits", VisitSchema);
