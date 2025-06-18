const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPass });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
});

module.exports = router;
