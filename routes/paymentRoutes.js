import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';
import { createPaymentIntent }  from '../controllers/paymentController.js';

const router = express.Router();

// Route to create a Stripe checkout session
router.post('/create-checkout-session', createCheckoutSession);

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

export default router;
