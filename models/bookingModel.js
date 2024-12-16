import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    location: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['domestic', 'events', 'commercial', 'end-of-tenancy'],
    },
    duration: {
      type: Number, 
      required: true,
    },
    pets: {
      type: String, 
      required: true,
      enum: ['yes', 'no'],
    },
    bookingDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value >= new Date(); 
        },
        message: 'Booking date cannot be in the past',
      },
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
