const Property = require('../models/Property');
const Booking = require('../models/Booking');

// Get properties owned by the host
exports.getHostProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id });
        res.status(200).json(properties);
    } catch (err) {
        console.error('Error fetching host properties:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get booking requests for host properties
exports.getHostBookings = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id });
        const bookings = await Booking.find({ property: { $in: properties.map(p => p._id) } }).populate('user');
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching host bookings:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
