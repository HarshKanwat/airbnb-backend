const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { getUserDetails, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Add this line
const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', logoutUser);

// User profile routes (protected with auth middleware)
router.get('/profile', authMiddleware, getUserDetails);
router.put('/profile', authMiddleware, uploadMiddleware, updateUserProfile); // Add uploadMiddleware

module.exports = router;
