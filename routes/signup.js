const bcrypt = require('bcrypt');
const User = require("../model/authSign"); // Capitalized for model
const express = require('express');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please fill all details" });
        }

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({ name, email, password: hash });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
