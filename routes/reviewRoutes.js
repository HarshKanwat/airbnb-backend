const express = require('express');
const { createReview, getReviewsForProperty } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:propertyId/reviews', getReviewsForProperty);
router.post('/:propertyId/reviews', authMiddleware, createReview);

module.exports = router;
