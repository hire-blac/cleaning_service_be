import express from 'express';
import { getAdminData, deleteAdminData } from '../controllers/adminController.js';
const router = express.Router();
import { protectAdmin  } from '../middleware/adminMiddleware.js'; 

// @desc    Get all bookings and payments for admin
// @route   GET /api/admin/bookings
// @access  Private/Admin
router.get('/bookings', protectAdmin, getAdminData);

// @desc    Delete a booking or payment
// @route   DELETE /api/admin/:type/:id
// @access  Private/Admin
router.delete('/:type/:id', protectAdmin, deleteAdminData);

export default router;
