import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking', // Reference to the Booking model
      required: false, // Optional, for payments tied to bookings
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String, // e.g., 'credit card', 'Paystack', 'Flutterwave'
      required: true,
    },
    transactionId: {
      type: String, // Payment provider's transaction ID
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
