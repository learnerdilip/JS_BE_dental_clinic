const mongoose = require("mongoose");

const ProcedureSchema = new mongoose.Schema({
  procedureName: { type: String },
  status: { type: Boolean },
  estimatedCost: { type: Number },
  paidAmount: { type: Number },
  balanceAmount: { type: Number },
});

const PaymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, required: true, allowNull: false },
  paymentAmount: { type: Number, required: true, allowNull: false },
});

const ProcedureWorkSchema = new mongoose.Schema({
  patientId: { type: String },
  procedureDate: { type: Date },
  toothNo: { type: String },
  diagnosis: { type: [String] }, // multiple select DD
  treatmentPlan: { type: String }, // open typed
  procedures: { type: [ProcedureSchema] }, // multiple DD
  note: { type: String },
  toothimage: { type: String },
  payments: { type: [PaymentSchema] },
  totalPaid: { type: Number },
  totalDue: { type: Number },
  totalBalance: { type: Number },
});

module.exports = mongoose.model("procedureday", ProcedureWorkSchema);
