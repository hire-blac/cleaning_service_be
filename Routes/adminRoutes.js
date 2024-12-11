import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin ,
  getAdminDashboard,
  getAllBookings,
  getBookingById,
  updateBookings,
  deleteBooking
} from '../controllers/adminController.js';
import { authenticateAdmin, authorizePermissions } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Admin registration and login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Get All Admins
router.get('/admins', getAllAdmins);

// Get a specific admin by ID
router.get('/admins/:id', getAdminById);

// New routes for updating and deleting admins
router.put('/admins/:id', updateAdmin); 
router.delete('/admins/:id', deleteAdmin); 

// Admin dashboard
router.get('/dashboard', authenticateAdmin, getAdminDashboard);

// Admin can manage bookings
// Admin can view all bookings
router.get('/admin/bookings', authenticateAdmin, authorizePermissions('manageBookings'), getAllBookings);

// Admin can view a specific booking by ID
router.get('/admin/bookings/:id', authenticateAdmin, authorizePermissions('manageBookings'), getBookingById);

// Admin can update a booking
router.put('/admin/bookings/:id', authenticateAdmin, authorizePermissions('manageBookings'), updateBookings);

// Admin can delete a booking
router.delete('/admin/bookings/:id', authenticateAdmin, authorizePermissions('manageBookings'), deleteBooking);




export default router;
