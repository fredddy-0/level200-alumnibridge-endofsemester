const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
    [name, email, hashed]
  );

  res.json({ msg: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
});

module.exports = router;