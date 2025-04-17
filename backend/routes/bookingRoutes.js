const express = require("express");
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("booking route working");
});

router.post('/', authMiddleware, bookingController.createBooking);

router.get('/:id', authMiddleware, bookingController.getBookingById); 

router.delete('/:id', authMiddleware, bookingController.cancelBookings);

router.get('/users/booking', authMiddleware, bookingController.getCurrentBookings);

module.exports = router; // ✅ export the router directly
