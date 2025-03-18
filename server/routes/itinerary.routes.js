const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itinerary.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, itineraryController.createItinerary);
router.get('/', authMiddleware, itineraryController.getItineraries);
router.get('/:id', authMiddleware, itineraryController.getItinerary);
router.put('/:id', authMiddleware, itineraryController.updateItinerary);
router.delete('/:id', authMiddleware, itineraryController.deleteItinerary);

module.exports = router;
