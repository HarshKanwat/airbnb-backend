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
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for the authenticated user
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('property');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for a specific property
exports.getPropertyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ property: req.params.propertyId });
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching property bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id) { // Assuming you have a user reference
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};