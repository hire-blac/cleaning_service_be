import express from 'express';
import { 
  getCheckoutSession 
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Secure routes with 'protect'
router.post('/checkout-session/:bookingId', protect, getCheckoutSession);


export default router;
