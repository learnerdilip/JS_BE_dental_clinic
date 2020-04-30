const mongoose = require("mongoose");

const toothWorkSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  VisitDate: { type: Date },
  toothNo: { type: Number, required: true, allowNull: false },
  diagnosis: { type: String },
  treatmentPlan: { type: String },
  procedures: { type: String },
  nextVisitDate: { type: Date },
  estimate: { type: Number },
  paymentMode: { type: String },
  received: { type: Number },
  balance: { type: Number },
  recieptNo: { type: String },
  medicinePrescribed: { type: [String] },
});

module.exports = mongoose.model("toothwork", toothWorkSchema);
