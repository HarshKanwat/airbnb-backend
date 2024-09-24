// controllers/userController.js

// Mock User Model (You should replace this with your actual database operations)
const users = [];

// Function to register a new user
const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: users.length + 1, name, email, password };
  users.push(user);
  res.status(201).json({
    message: 'User registered successfully',
    user
  });
};

// Function to login a user
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({
    message: 'User logged in successfully',
    user
  });
};

// Function to get user details
const getUser = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({
    message: 'User details retrieved successfully',
    user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser
};
