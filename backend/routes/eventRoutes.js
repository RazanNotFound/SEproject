const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', eventController.getAllApprovedEvents);
router.get('/all', protect, authorize('admin'), eventController.getAllEvents);
router.get('/organizer/analytics', protect, authorize('organizer'), eventController.eventAnalytics);
router.post('/', protect, authorize('organizer'), eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', protect, authorize('organizer', 'admin'), eventController.updateEvent);
router.delete('/:id', protect, authorize('organizer', 'admin'), eventController.deleteEvent);

module.exports = router;
