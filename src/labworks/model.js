const mongoose = require("mongoose");

const labworkSchema = new mongoose.Schema({
  labName: { type: String },
  patientName: { type: String },
  workType: { type: String },
  collectionDate: { type: Date },
  deliveryDate: { type: Date },
  itemSent: { type: String },
  itemReceived: { type: String },
  note: { type: String },
  price: { type: Number },
  status: { type: Boolean }, //status of payment
});

module.exports = mongoose.model("labwork", labworkSchema);
