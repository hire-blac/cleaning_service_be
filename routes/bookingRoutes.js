import express from 'express';
import {
  createBooking,
  getBookings,
} from '../controllers/bookingController.js';
// import { protect } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/bookings',  createBooking);
router.get('/bookings', getBookings); 


export default  router;
