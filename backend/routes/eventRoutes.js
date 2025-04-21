// backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

// Use the middleware functions
router.get('/', eventController.getAllApprovedEvents);
router.get('/all', authenticationMiddleware, authorizationMiddleware(['admin']), eventController.getAllEvents);
router.get('/organizer/analytics', authenticationMiddleware, authorizationMiddleware(['organizer']), eventController.eventAnalytics);
router.post('/', authenticationMiddleware, authorizationMiddleware(['organizer']), eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', authenticationMiddleware, authorizationMiddleware(['organizer', 'admin']), eventController.updateEvent);
router.delete('/:id', authenticationMiddleware, authorizationMiddleware(['organizer', 'admin']), eventController.deleteEvent);

module.exports = router;
