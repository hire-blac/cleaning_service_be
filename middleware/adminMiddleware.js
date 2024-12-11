import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';

// Authenticate Admin Middleware
export const authenticateAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token and decode admin data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Now query the Admin model to ensure the admin exists in the database
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, admin does not exist' });
    }

    req.admin = admin; // Attach the full admin object (not just decoded data) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
});

// Middleware to check permissions
export const authorizePermissions = (permission) => {
  return asyncHandler(async (req, res, next) => {
    const admin = req.admin;

    // Ensure permissions field exists and is an object
    if (!admin.permissions || typeof admin.permissions !== 'object') {
      return res.status(500).json({ message: 'Admin permissions not properly configured' });
    }

    // Check if the admin has the required permission
    if (!admin.permissions[permission]) {
      return res.status(403).json({ message: 'You do not have permission for this action' });
    }

    next();
  });
};
