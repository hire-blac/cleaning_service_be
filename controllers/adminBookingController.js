import Booking from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (booking) {
      await booking.deleteOne();
      res.json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
