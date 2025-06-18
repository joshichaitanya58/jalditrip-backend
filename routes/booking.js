const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Trip booked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
