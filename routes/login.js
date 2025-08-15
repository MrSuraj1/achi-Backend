const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/authSign");

const login = express.Router();

login.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const emailFind = await User.findOne({ email });
    if (!emailFind) {
      return res.status(400).json({ message: "Please signup first" });
    }

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(password, emailFind.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: emailFind._id, email: emailFind.email },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    // 4. Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: emailFind._id,
        name: emailFind.name,
        email: emailFind.email
      }
    });

  } catch (err) {
    console.error("error in login", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = login;
