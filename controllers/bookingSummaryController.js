import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js'; 

// Get booking summary by ID
const getBookingSummary = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the booking ID from the URL params

  try {
    // Find the booking in the database by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Send the booking data in the response
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { getBookingSummary };
