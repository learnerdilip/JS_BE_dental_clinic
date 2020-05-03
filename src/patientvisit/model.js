const mongoose = require("mongoose");
const Medicines = require("./medicinemodel");

const PatientVisitSchema = new mongoose.Schema({
  patientId: { type: String, required: true, allowNull: false },
  Visitdate: { type: Date, required: true, allowNull: false },
  procedureEstimate: { type: Number }, //total of procedure costs of all teeth
  consultationCost: { type: Number },
  paymentMode: { type: String },
  received: { type: Number },
  balance: { type: Number },
  recieptNo: { type: String }, // deprecate
  medicinePrescribed: { type: [Medicines] },
});

module.exports = mongoose.model("patientvisits", PatientVisitSchema);
