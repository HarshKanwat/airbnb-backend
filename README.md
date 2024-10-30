# Backend for Airbnb Clone

This is the backend server for an Airbnb clone project. It provides RESTful API endpoints to handle authentication, property management, booking, payments, and host functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Properties](#properties)
  - [Bookings](#bookings)
  - [Reviews](#reviews)
  - [Payments](#payments)
  - [Hosts](#hosts)
- [Middleware](#middleware)

---

## Features

- User authentication and profile management.
- Property creation, viewing, updating, and deletion.
- Booking and availability management.
- Host-specific operations.
- Payment processing.
- Review and rating functionality.

## Technologies Used

- **Node.js** and **Express** for building the server and API.
- **MongoDB** as the database with Mongoose as the ODM.
- **JWT** (JSON Web Tokens) for user authentication.
- **Stripe** or other payment gateways for payment processing.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/airbnb-clone-backend.git
   cd airbnb-clone-backend


backend/
├── controllers/
│   ├── authController.js
│   ├── propertyController.js
│   ├── bookingController.js
│   ├── reviewsController.js
│   ├── paymentController.js
│   └── hostController.js
├── models/
│   ├── User.js
│   ├── Property.js
│   ├── Booking.js
│   ├── Review.js
│   ├── Calendar.js
│   └── Payment.js
├── routes/
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   ├── bookingRoutes.js
│   ├── reviewRoutes.js
│   ├── paymentRoutes.js
│   └── hostRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── config/
│   └── db.js
├── server.js
└── README.md


API Endpoints
Authentication
POST /api/auth/register - Register a new user.
POST /api/auth/login - Login a user and get a JWT token.
GET /api/auth/profile - Get the logged-in user's profile.
Properties
GET /api/properties - Get all properties.
POST /api/properties - Create a new property (host only).
GET /api/properties/:id - Get a specific property by ID.
PUT /api/properties/:id - Update property details (host only).
DELETE /api/properties/:id - Delete a property (host only).
Bookings
POST /api/bookings - Create a new booking.
GET /api/bookings/user/:userId - Get bookings for a specific user.
GET /api/bookings/property/:propertyId - Get bookings for a specific property.
DELETE /api/bookings/:id - Cancel a booking.
Reviews
POST /api/reviews/:propertyId - Create a new review for a property.
GET /api/reviews/:propertyId - Get all reviews for a specific property.
Payments
POST /api/payments/create - Initiate a new payment.
PATCH /api/payments/update - Update payment status (e.g., completed).
Hosts
GET /api/hosts/properties - Get properties managed by the host.
GET /api/hosts/bookings - Get bookings for host properties.
Middleware
authMiddleware: Protects routes by ensuring the user is authenticated.
errorMiddleware: Handles errors and provides consistent error responses.
