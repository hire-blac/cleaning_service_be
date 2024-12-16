import Booking from '../models/bookingModel.js';


const createBooking = async (req, res) => {
  console.log('Request Body:', req.body);  // Log request body for debugging

  const { location, service, duration, pets, bookingDate } = req.body;

  if (!location || !service || !duration || !pets || !bookingDate) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Ensure user is authenticated and userId is available in req.user
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Create a new booking using the authenticated user's ID
  const booking = new Booking({
    userId: req.user._id,  // Use userId from the authenticated user
    location,
    service,
    duration,
    pets,
    bookingDate,
  });

  // Save the new booking to the database
  const newBooking = await booking.save();
  res.status(201).json({ success: true, message: 'Booking created', booking: newBooking });
};





const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service') 
      .populate('user'); 

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings.', error });
  }
};

export   {
  createBooking,
  getBookings,
};
