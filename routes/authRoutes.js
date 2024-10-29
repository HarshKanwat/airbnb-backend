const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { getUserDetails, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// User profile routes
router.get('/profile', authMiddleware, getUserDetails);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
