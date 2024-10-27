const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const { property, startDate, endDate, totalPrice } = req.body;

    // Check if the property exists
    const propertyExists = await Property.findById(property);
    if (!propertyExists) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Create a new booking
    const booking = new Booking({
      property,
      user: req.user.id,
      startDate,
      endDate,
      totalPrice,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (err) {
    next(err);
  }
};

// Get bookings for a specific user
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('property');
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get bookings for a specific property
exports.getPropertyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ property: req.params.propertyId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user is authorized to cancel the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    next(err);
  }
};
