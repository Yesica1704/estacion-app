const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const isAuthenticated = require('../middleware/authMiddleware');

router.post('/spaces/add', isAuthenticated, parkingController.addParkingSpace);
router.get('/spaces', isAuthenticated, parkingController.getParkingSpaces);
router.post('/spaces/update', isAuthenticated, parkingController.updateParkingSpace);
router.post('/spaces/delete', isAuthenticated, parkingController.deleteParkingSpace);
router.get('/spaces/parkingstatus', isAuthenticated, parkingController.getParkingStatus);

module.exports = router;