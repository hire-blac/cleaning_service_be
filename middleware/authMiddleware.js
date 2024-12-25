import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

 const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(' ')[1]; // Get token from 'Bearer <token>'

      // Verify token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data to the request object
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // Call next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Token has expired. Please log in again.' });
      } else {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  }

  // If no token, return unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});


export {protect};
