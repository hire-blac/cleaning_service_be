import Booking from "../models/bookingModel.js";



// Create a Booking
  const createBooking = async (req, res) => {
  const { userId, address, serviceType, duration, petsOption, dateOfAppointment } = req.body;

  try {
    // Validate request data
    if (!userId || !address || !serviceType || !duration || !petsOption || !dateOfAppointment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate serviceType
    const validServiceTypes = ["domestic cleaning", "commercial cleaning", "end of tenancy cleaning", "events and festivals"];
    if (!validServiceTypes.includes(serviceType)) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    // Validate petsOption
    if (!["yes", "no"].includes(petsOption)) {
      return res.status(400).json({ message: "Pets option must be 'yes' or 'no'" });
    }

    // Create new booking
    const booking = await Booking.create({
      userId,
      address,
      serviceType,
      duration,
      petsOption,
      dateOfAppointment,
    });

    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create booking" });
  }
};


// Get User-Specific Bookings
const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch bookings for the specified user
    const bookings = await Booking.find({ userId });
    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export {
  createBooking,
  getUserBookings,
};
