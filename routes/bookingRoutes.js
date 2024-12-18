import express from 'express';
import {
  createBooking,
  getBookings,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/bookings', protect, createBooking);
router.get('/bookings', getBookings); 


export default  router;
