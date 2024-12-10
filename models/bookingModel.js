import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    service: {
      type: String,  
      required: true, 
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
