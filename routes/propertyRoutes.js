// propertyRoutes.js
const express = require('express');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getUserProperties // Import the new method
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllProperties);
router.get('/user', authMiddleware, getUserProperties); // New route for user-specific properties
router.get('/:id', getPropertyById);
router.post('/', authMiddleware, createProperty);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
