const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String },
  medicineDosage: { type: String },
  medicinedays: { type: Number },
  medicineTimes: { type: String },
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
});

module.exports = mongoose.model("patientvisits", PatientVisitSchema);
