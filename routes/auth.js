const router = require("express").Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, age, password, role } = req.body;

    if (!name || !email || !age || !password) {
      return res.status(400).json({ error: "name, email, age, password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (Number.isNaN(Number(age)) || Number(age) <= 0) {
      return res.status(400).json({ error: "Age must be a positive number" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const user = await User.create({ name, email, age, password, role: role || "user" });
    // never return password
    const { _id, role: userRole } = user;
    res.status(201).json({ id: _id, name, email, age, role: userRole });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password are required" });

    const user = await User.findOne({ email }).select("+password role name email");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
