const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    // Fetch booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const amount = booking.totalPrice * 100; // Assume amount is in cents

    // Mock PaymentIntent
    const paymentIntent = {
      id: 'pi_mocked_123456789',
      client_secret: 'cs_mocked_123456789'
    };

    // Save payment details in the database
    const payment = new Payment({
      user: req.user.id,
      property: booking.property,
      amount,
      status: 'pending',
      paymentIntentId: paymentIntent.id,
    });
    await payment.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
