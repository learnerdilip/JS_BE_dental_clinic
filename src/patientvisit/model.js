const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  mediName: { type: String },
  dosage: { type: String },
  medicineTimesPerDay: { type: String },
  mediDays: { type: String },
});

const toothWorkSchema = new mongoose.Schema({
  toothNo: { type: String },
  diagnosis: { type: [String] }, // multiple select DD
  treatmentPlan: { type: String }, // open typed
  procedures: { type: [String] }, // multiple DD
  procedureCost: { type: Number }, // new
  toothimage: { type: String },
});

const PatientVisitSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  Visitdate: { type: Date, required: true, allowNull: false },
  procedureEstimate: { type: Number }, //total of procedure costs of all teeth
  consultationCost: { type: Number },
  paymentMode: { type: String },
  received: { type: Number },
  balance: { type: Number },
  medicinePrescribed: { type: [medicineSchema] },
  toothData: { type: [toothWorkSchema] },
  chiefComplaint: { type: String },
  oralExamination: { type: String },
  investigation: { type: String },
  treatmentPlan: { type: String },
  advice: { type: String },
});

module.exports = mongoose.model("patientvisits", PatientVisitSchema);
