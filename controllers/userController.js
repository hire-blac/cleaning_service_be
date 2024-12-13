import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
 
  const {  email, password } = req.body;
 
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeAddress: user.homeAddress,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, homeAddress } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    homeAddress,
  });

  if (user) {
    generateToken(res, user._id);

       // Send welcome email to the user
       const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail, but you can switch to another provider
        auth: {
          user: process.env.EMAIL_USER, // Your email account
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to: email, // Recipient's email
        subject: 'Welcome to Our Platform!',
        text: `Hello ${firstName},\n\nWelcome to our platform! We're excited to have you join us. If you need any help, feel free to contact us.\n\nBest regards,\nYour Company Name`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending welcome email:', err);
          return res.status(500).json({ message: 'Error sending welcome email' });
        }
        console.log('Welcome email sent:', info.response);
      });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeAddress: user.homeAddress,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
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
  logoutUser,
  getUserProfile,
  updateUserProfile,
};