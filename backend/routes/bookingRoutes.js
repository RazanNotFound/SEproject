//const express = require("express");
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
//const router = express.Router();

router.post('/', authMiddleware, bookingController.createBooking);

router.get('/:id', authMiddleware, bookingController.getBookingById); 

router.delete('/:id', authMiddleware, bookingController.cancelBookings);

router.get('/users/booking', authMiddleware, bookingController.getCurrentBookings);

//module.exports = router;