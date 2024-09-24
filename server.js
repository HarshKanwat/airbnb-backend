const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Corrected import
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorMiddleware');
require('dotenv').config(); // Correct import for dotenv

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes); // Corrected route
app.use('/api/reviews', reviewRoutes);

// Error Handling
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
