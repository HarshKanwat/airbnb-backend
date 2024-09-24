const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:propertyId', getReviews);
router.post('/:propertyId', authMiddleware, createReview);

module.exports = router;
