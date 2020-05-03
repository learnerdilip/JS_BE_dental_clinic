const mongoose = require("mongoose");

const toothWorkSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  visitId: { type: String, required: true, allowNull: false }, //new field
  toothNo: { type: Number, required: true, allowNull: false },
  diagnosis: { type: [String] }, // multiple select DD
  treatmentPlan: { type: String }, // open typed
  procedures: { type: String }, // multiple DD
  procedureCost: { type: Number },// new
  toothimage: { type: String },
  // nextVisitDate: { type: Date },
  // VisitDate: { type: Date },
  // estimate: { type: Number },
  // paymentMode: { type: String },
  // received: { type: Number },
  // balance: { type: Number },
  // recieptNo: { type: String },
  // medicinePrescribed: { type: [String] },
});

module.exports = mongoose.model("toothwork", toothWorkSchema);
