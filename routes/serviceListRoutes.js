import express from 'express';
import { getAllServicesList, getServiceListById, createServiceList, updateServiceList, deleteServiceList } from '../controllers/serviceListController.js';

const router = express.Router();

// GET all services
router.get('/servicelist', getAllServicesList);


// GET: Fetch a service by ID
router.get('/:id', getServiceListById);

// POST create a new service
router.post('/servicelist', createServiceList);

// PUT update an existing service
router.put('/servicelist/:id', updateServiceList);

// DELETE delete a service
router.delete('/servicelist/:id', deleteServiceList);

export default router;