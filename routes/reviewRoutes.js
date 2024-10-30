const express = require('express');
const { createReview, getReviewsForProperty, getUserReviews, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all reviews for a specific property
router.get('/:propertyId/reviews', getReviewsForProperty);

// Get all reviews for the logged-in user
router.get('/user/reviews', authMiddleware, getUserReviews);

// Create a new review
router.post('/:propertyId/reviews', authMiddleware, createReview);

// Delete a review for a specific property
router.delete('/:propertyId/reviews/:reviewId', authMiddleware, deleteReview); // More specific delete route

module.exports = router;
