const mongoose = require("mongoose");

const toothWorkSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  VisitDate: { type: Date },
  toothNo: { type: Number, required: true, allowNull: false },
  diagnosis: { type: String },
  treatmentPlan: { type: String },
  workDone: { type: String },
  workDate: { type: Date, required: true, allowNull: false },
  estimate: { type: Number },
  received: { type: Number },
  balance: { type: Number },
  recieptNo: { type: String },
});

module.exports = mongoose.model("toothwork", toothWorkSchema);
