import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import completeRoutes from './routes/completeRoutes.js';
import admin from 'firebase-admin';
import User from './models/userModel.js'; 

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;


if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
}

const absolutePath = path.resolve(serviceAccountPath);

const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

if (!fs.existsSync(absolutePath)) {
  throw new Error("Firebase service account file not found at the specified path: " + absolutePath);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lomacom-cleaning-services-default-rtdb.firebaseio.com"
});




const port = process.env.PORT || 8082;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
      'https://www.lomacom.co.uk', 
      'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'nonce-random-generated-nonce'" 
      ],
      styleSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);




app.get('/api/config', (req, res) => {
  res.json({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    apiBaseUrl: process.env.API_BASE_URL, 
  });
});





// Example route for Google login
app.post('/api/users/google-login', async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
      return res.status(400).json({ message: 'Token ID is required' });
  }

  try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      const { email, uid } = decodedToken;

      // Implement user creation or retrieval logic here
      let user = await User.findOne({ email });
      if (!user) {
          user = new User({ email, uid }); // Create new user if not found
          await user.save();
      }

      // Respond with success message and user data
      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      console.error("Error verifying Google token:", error);
      res.status(500).json({ message: 'Error verifying Google token', error: error.message });
  }
});



// Routes
app.use('/api/users', userRoutes);
app.use("/api", bookingRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/domestic-cleaning', bookingRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', completeRoutes);


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

