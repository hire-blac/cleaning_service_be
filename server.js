import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js';
import bookingRoutes from './Routes/bookingRoutes.js';
import serviceRoutes from './Routes/serviceRoutes.js';
import serviceListRoutes from './Routes/serviceListRoute.js'
import adminRoutes from './Routes/adminRoutes.js';



dotenv.config();

const port = process.env.PORT || 8080;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  })
);

// Routes
app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/domestic-cleaning', bookingRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api' , serviceListRoutes);


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
