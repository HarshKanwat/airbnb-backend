const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Authorization denied, user not found' });
    }
    req.userId = req.user._id;  // Assign user ID to req.userId for easy access
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Authorization denied, invalid token' });
  }
};

module.exports = authMiddleware;