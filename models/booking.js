const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  source: String,
  destination: String,
  contact: String,
  date: String,
  passengers: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
