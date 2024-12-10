import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
  manageBookings,
  managePayments,
  manageUsers
} from '../controllers/adminController.js';
import { authenticateAdmin, authorizePermissions } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Admin registration and login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Admin dashboard
router.get('/dashboard', authenticateAdmin, getAdminDashboard);

// Admin can manage bookings
router.put('/manage-bookings/:id', authenticateAdmin, authorizePermissions('manageBookings'), manageBookings);

// Admin can manage payments
router.put('/manage-payments/:id', authenticateAdmin, authorizePermissions('managePayments'), managePayments);

// Admin can manage users
router.put('/manage-users/:id', authenticateAdmin, authorizePermissions('manageUsers'), manageUsers);

export default router;
