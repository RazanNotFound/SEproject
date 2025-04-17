const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("booking route working");
});

module.exports = router; // ✅ export the router directly
