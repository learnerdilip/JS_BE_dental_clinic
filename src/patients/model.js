const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true, allowNull: false },
  gender: { type: String },
  dob: { type: Date },
  mobileNo: { type: String },
  email: { type: String },
  address: { type: String },
  medicalHistory: { type: String },
  maritalStatus: { type: String },
  profession: { type: String },
  bloodGroup: { type: String },
  allergies: { type: String },
  habits: { type: String },
  dentalHistory: { type: String },
});

module.exports = mongoose.model("patients", PatientSchema);
