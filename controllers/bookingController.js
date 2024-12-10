import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Private
const createBooking = asyncHandler(async (req, res) => {
  const { service, bookingDate, address, services, totalAmount } = req.body;

  const booking = new Booking({
    userId: req.user._id, 
    service,
    bookingDate,
    address,
    services,
    totalAmount,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc   Get booking by ID
// @route  GET /api/bookings/:id
// @access Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

export { createBooking, getBookingById };
