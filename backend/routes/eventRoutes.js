// backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

// Use the middleware functions
router.get('/', eventController.getAllApprovedEvents);
router.get('/all', authenticationMiddleware, authorizationMiddleware(['System Admin']), eventController.getAllEvents);
router.get('/organizer/analytics', authenticationMiddleware, authorizationMiddleware(['Organizer']), eventController.eventAnalytics);
router.post('/', authenticationMiddleware, authorizationMiddleware(['Organizer']), eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.updateEvent);
router.delete('/:id', authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.deleteEvent);

module.exports = router;
