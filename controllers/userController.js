import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      // Respond with token and user details
      return res.status(200).json({
        token, 
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          homeAddress: user.homeAddress,
        },
      });
    }
    // If authentication fails
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, homeAddress } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      homeAddress,
    });

    if (!user) {
      return res.status(500).json({ message: 'Failed to register user' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Create a transporter to send the welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Set up mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Our Platform!',
      text: `Hello ${firstName},\n\nWelcome to our platform! We're excited to have you join us. If you need any help, feel free to contact us.\n\nBest regards,\nYour Company Name`,
    };

    // Send email asynchronously
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);

    // Send successful response
    res.status(201).json({
      message: 'User registered successfully and welcome email sent.',
      token,
      userId: user._id,
    });

  } catch (err) {
    console.error('Error registering user or sending email:', err);
    res.status(500).json({ message: 'User registration failed or email sending failed.' });
  }
});


const getUserById = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // "Bearer <token>"
    
    if (!token) {
      return res.status(403).json({ message: 'Authorization token required' });
    }

    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded userId matches the one in the request parameters
    const userId = req.params.id;
    if (decoded.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to user data' });
    }

    // Query the database for the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details (excluding sensitive information like password)
    const { firstName, lastName, email, phoneNumber, homeAddress } = user;
    return res.status(200).json({ firstName, lastName, email, phoneNumber, homeAddress });
    
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // No cookies to clear anymore, just send a message
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeAddress: user.homeAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body); // 

  const user = await User.findById(req.user._id);

  if (user) {
    // Check if the email is being updated and validate uniqueness
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400).json({ message: 'Email is already taken' });
        return; // Exit early if email already exists
      }
    }

    // Ensure firstName is a string
    if (typeof req.body.firstName !== 'string') {
      return res.status(400).json({ message: 'First name must be a string' });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.homeAddress = req.body.homeAddress || user.homeAddress;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      homeAddress: updatedUser.homeAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export {
  authUser,
  registerUser,
  getUserById,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
