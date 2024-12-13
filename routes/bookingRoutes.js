import express from 'express';
import { createBooking, getBookingById } from '../controllers/bookingController.js';
import { getBookingSummary } from '../controllers/bookingSummaryController.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/booking').post(protect, createBooking);
router.route('/:id').get(protect, getBookingById);
router.get('/summary/:id', protect, getBookingSummary);




export default router;