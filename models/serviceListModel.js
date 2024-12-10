import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  icon: { type: String, required: false }, 
 
}, { timestamps: true });

const ServiceList = mongoose.model('ServiceList', serviceSchema);

export default ServiceList;
