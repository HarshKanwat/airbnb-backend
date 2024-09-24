const express = require('express');
const {
  createBooking,
  getUserBookings,
  getPropertyBookings,
  cancelBooking
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get all bookings for a user
router.get('/user/:userId', authMiddleware, getUserBookings);

// Get all bookings for a property
router.get('/property/:propertyId', authMiddleware, getPropertyBookings);

// Cancel a booking
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;
