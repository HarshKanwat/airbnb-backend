const User = require('../models/User');

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile with image
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    if (req.file) {
      user.image = `/uploads/${req.file.filename}`;
    }
    await user.save();
    res.status(200).json({
      message: 'User profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, image: user.image },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserDetails, updateUserProfile };
