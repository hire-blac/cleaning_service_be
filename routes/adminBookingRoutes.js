import express from "express";
import { getAllBookings, updateBooking, deleteBooking } from "../controllers/adminBookingController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protectAdmin, getAllBookings);
router.put("/:id", protectAdmin, updateBooking);
router.delete("/:id", protectAdmin, deleteBooking);

export default router;
