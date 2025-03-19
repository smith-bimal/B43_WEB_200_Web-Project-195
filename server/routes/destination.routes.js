const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, destinationController.createDestination);
router.get('/', authMiddleware, destinationController.getDestinations);
router.get('/:id', authMiddleware, destinationController.getDestination);
router.put('/:id', authMiddleware, destinationController.updateDestination);
router.delete('/:id', authMiddleware, destinationController.deleteDestination);

module.exports = router;
