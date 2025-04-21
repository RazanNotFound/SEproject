const express = require("express");
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authenticationMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("booking route working");
});

router.post('/', authMiddleware, authorizationMiddleware(["Standard User"]), bookingController.createBooking);

router.get('/:id', authMiddleware, authorizationMiddleware(["Standard User"]), bookingController.getBookingById); 

router.delete('/:id', authMiddleware, authorizationMiddleware(["Standard User"]), bookingController.cancelBookings);

module.exports = router; // ✅ export the router directly
