
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';



export const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded; // Attach decoded admin data
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  };
  
  // Middleware to check permissions
  export const authorizePermissions = (permission) => {
    return (req, res, next) => {
      const admin = req.admin;
  
      if (!admin.permissions[permission]) {
        return res.status(403).json({ message: 'You do not have permission for this action' });
      }
  
      next();
    };
  };
  