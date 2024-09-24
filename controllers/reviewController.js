const Review = require('../models/Review');
const Property = require('../models/Property');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createReview = async (req, res) => {
  const { text, rating } = req.body;
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const review = new Review({ text, rating, property: req.params.propertyId, user: req.user.id });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews, createReview };
