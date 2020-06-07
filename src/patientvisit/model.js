const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  mediName: { type: String },
  dosage: { type: String },
  medicineTimesPerDay: { type: String },
  mediDays: { type: String },
});

const oralExamSchema = new mongoose.Schema({
  issue: { type: String },
  toothItems: { type: [Number] },
});

const PatientVisitSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  Visitdate: { type: Date, required: true, allowNull: false },
  consultationCost: { type: Number, required: true },
  paymentMode: { type: String },
  medicinePrescribed: { type: [medicineSchema] },
  chiefComplaint: { type: String },
  oralExamination: { type: [oralExamSchema] },
  investigation: { type: String },
  treatmentPlan: { type: String },
  advice: { type: String },
});

module.exports = mongoose.model("patientvisits", PatientVisitSchema);
