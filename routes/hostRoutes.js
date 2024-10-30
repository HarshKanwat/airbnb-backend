const express = require('express');
const { getHostProperties, getHostBookings } = require('../controllers/hostController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/properties', authMiddleware, getHostProperties);
router.get('/bookings', authMiddleware, getHostBookings);

module.exports = router;
