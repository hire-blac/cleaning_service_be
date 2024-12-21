import Booking from '../models/bookingModel.js';
import Payment from '../models/paymentModel.js';

// @desc    Get all bookings and payments for admin
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAdminData = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId');
    const payments = await Payment.find().populate('userId');
    res.json({ bookings, payments });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a booking or payment
// @route   DELETE /api/admin/:type/:id
// @access  Private/Admin
const deleteAdminData = async (req, res) => {
  const { type, id } = req.params;

  try {
    if (type === 'bookings') {
      await Booking.findByIdAndDelete(id);
      res.json({ message: 'Booking deleted successfully' });
    } else if (type === 'payments') {
      await Payment.findByIdAndDelete(id);
      res.json({ message: 'Payment deleted successfully' });
    } else {
      res.status(400).json({ message: 'Invalid data type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting data' });
  }
};

export { getAdminData, deleteAdminData };
