const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String },
  medicineDosage: { type: String },
  medicinedays: { type: Number },
  medicineTimes: { type: String },
});

module.exports = mongoose.model("medicines", medicineSchema);
