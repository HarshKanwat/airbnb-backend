const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { text, rating } = req.body;
    const review = new Review({
      property: propertyId,
      user: req.user._id,
      text,
      rating
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reviews for a specific property
const getReviewsForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const reviews = await Review.find({ property: propertyId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReview,
  getReviewsForProperty
};
