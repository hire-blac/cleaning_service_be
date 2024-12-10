import express from 'express';
import { createService, getAllServices } from '../controllers/serviceController.js';

const router = express.Router();

// POST request to create a service
router.post('/', createService);

// GET request to fetch all services
router.get('/', getAllServices);

export default router;
