import express from 'express';
import { handlePaymentComplete } from '../controllers/completeController.js';

const router = express.Router();

// Route for handling the /complete endpoint
router.get('/complete', handlePaymentComplete);

export default router;
