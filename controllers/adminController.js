import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import Booking from '../models/bookingModel.js'; 
// import Payment from '../models/paymentModel.js'; s

// Register admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
  
    // Create a new admin
    const admin = new Admin({ name, email, password });
    await admin.save();
  
    res.status(201).json({ message: 'Admin registered successfully', admin });
  };
  
// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordMatch = await admin.matchPassword(password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate token with admin data
  const token = jwt.sign(
    { id: admin._id, role: admin.role, permissions: admin.permissions },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Admin login successful', token });
};

// Admin dashboard
 const getAdminDashboard = async (req, res) => {
  const admin = req.admin;
  // Return data like total users, bookings, and payments
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalPayments = await Payment.countDocuments();

  res.json({
    totalUsers,
    totalBookings,
    totalPayments,
  });
};

// Manage bookings
 const manageBookings = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Update the booking or perform other actions
  booking.status = req.body.status || booking.status;
  await booking.save();

  res.json({ message: 'Booking updated successfully', booking });
};

// Manage payments
 const managePayments = async (req, res) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);

  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  // Update the payment status
  payment.status = req.body.status || payment.status;
  await payment.save();

  res.json({ message: 'Payment updated successfully', payment });
};

// Manage users
 const manageUsers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Perform user management tasks like updating user info or deactivating the account
  user.status = req.body.status || user.status;
  await user.save();

  res.json({ message: 'User updated successfully', user });
};


export { getAdminDashboard, registerAdmin, loginAdmin,manageBookings, managePayments, manageUsers }
