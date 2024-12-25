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
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import completeRoutes from './routes/completeRoutes.js';



dotenv.config();

const port = process.env.PORT || 8082;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',   
      'https://www.lomacom.co.uk' 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  })
);

app.options('*', cors());

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




// Routes
app.use('/api/users', userRoutes);
app.use("/api", bookingRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/domestic-cleaning', bookingRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', completeRoutes);


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

