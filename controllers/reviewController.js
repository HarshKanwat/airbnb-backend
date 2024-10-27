const Review = require('../models/Review');
const Property = require('../models/Property');

// Get reviews for a specific property
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new review for a property
const createReview = async (req, res) => {
  const { text, rating } = req.body;
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const review = new Review({
      text,
      rating,
      property: req.params.propertyId,
      user: req.user.id,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews, createReview };
