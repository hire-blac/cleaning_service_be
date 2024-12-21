import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["domestic cleaning", "commercial cleaning", "end of tenancy cleaning", "events and festivals"],
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    petsOption: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    dateOfAppointment: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
