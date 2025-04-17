const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("Users route working");
});

module.exports = router; // ✅ export the router directly
