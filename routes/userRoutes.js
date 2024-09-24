// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user details
router.get('/:userId', getUser);

module.exports = router;
