const errorHandler = (err, req, res, next) => {
  // Default to 500 if status code not set
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  // Customize messages for specific error types if needed
  const errorMessage = err.name === 'ValidationError' ? err.message : 'An unexpected error occurred';

  // Send error response
  res.json({
    message: errorMessage,
    // Include stack trace in non-production environments
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
