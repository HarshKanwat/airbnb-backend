const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Function to login a user
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return { message: 'Invalid credentials' };
    }

    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      return { message: 'Invalid credentials' };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      message: 'User logged in successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  } catch (error) {
    console.error('Error during login:', error);
    return { message: 'Server error' };
  }
};

// Test the login function
const testLogin = async () => {
  const email = 'john@example.com';
  const password = 'Password123!'; // Use the correct plaintext password

  const result = await loginUser(email, password);
  console.log(result);
};

testLogin();
