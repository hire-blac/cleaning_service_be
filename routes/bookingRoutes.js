import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Create a Booking
router.post("/bookings" ,protect, createBooking);

// Get User-Specific Bookings
router.get("/bookings/user/:userId", getUserBookings);

export default router;
