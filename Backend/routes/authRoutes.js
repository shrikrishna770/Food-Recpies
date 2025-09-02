const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("../firebaseAdmin"); // Centralized Firebase Admin SDK
const { signup, login } = require("../controllers/authController");
const User = require("../models/user");
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);

// 🔹 Google login
router.post("/google-login", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      console.error("No idToken provided");
      return res.status(400).json({ message: "No idToken provided" });
    }

    // Verify Firebase token
    let decodedUser;
    try {
      decodedUser = await admin.auth().verifyIdToken(idToken);
    } catch (verifyErr) {
      console.error("Firebase token verification failed:", verifyErr);
      return res.status(401).json({ message: "Invalid Firebase token" });
    }

    // Find or create user in MongoDB
    let user = await User.findOne({ email: decodedUser.email });
    if (!user) {
      user = await User.create({
        name: decodedUser.name,
        email: decodedUser.email,
        googleId: decodedUser.uid,
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Google login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Google login backend error:", err);
    res
      .status(500)
      .json({ message: "Google login failed", error: err.message });
  }
});

module.exports = router;
