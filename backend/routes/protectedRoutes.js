const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Example protected route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, user ID: ${req.user.userId}`,
  });
});

module.exports = router;
