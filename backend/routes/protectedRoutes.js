const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

// Example protected route
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, user ID: ${req.user._id}`,
  });
});

module.exports = router;
