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
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reviews for a specific property
const getReviewsForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const reviews = await Review.find({ property: propertyId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews for property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reviews for the logged-in user
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).populate('property');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    // Check if review exists
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to delete this review' });
    }

    await review.remove();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReview,
  getReviewsForProperty,
  getUserReviews,  // Export the getUserReviews function
  deleteReview,
};
