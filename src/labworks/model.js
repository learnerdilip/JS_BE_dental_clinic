const mongoose = require("mongoose");

const labworkSchema = new mongoose.Schema({
  labName: { type: String },
  workType: { type: String },
  collectionDate: { type: Date },
  deliveryDate: { type: Date },
  itemSent: { type: String },
  itemReceived: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("labwork", labworkSchema);
