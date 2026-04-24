const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  quantity: Number,
  deliverGate: String,
  departureTime: Date,
  destinationCity: String,
  flightNumber: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model('Bag', bagSchema);