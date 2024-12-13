import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import serviceListRoutes from './routes/serviceListRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import adminBookingRoutes from './routes/adminBookingRoutes.js'
import adminUserRoutes from './routes/adminUserRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'



dotenv.config();

const port = process.env.PORT || 8080;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'nonce-random-generated-nonce'" // Accept only this nonce
      ],
      styleSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);


// CORS middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
  
);

app.get('/api/config', (req, res) => {
  res.json({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    apiBaseUrl: process.env.API_BASE_URL, 
  });
});




// Routes
app.use('/api/users', userRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use('/api/domestic-cleaning', bookingRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api' , serviceListRoutes);
app.use('/api', paymentRoutes);


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
