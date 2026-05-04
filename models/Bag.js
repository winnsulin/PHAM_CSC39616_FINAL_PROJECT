const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  flightNumber: String,
  destinationCity: String,
  deliverGate: String,
  tminus: Number,
  quantity: Number,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model('Bag', bagSchema);