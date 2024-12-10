import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'GBP' },
  unit: { type: String, default: 'hour' },
}, {
  timestamps: true,
});

// Virtual field to format price
serviceSchema.virtual('formattedPrice').get(function() {
  const formattedPrice = `${this.currency === 'GBP' ? '£' : ''}${this.price.toFixed(2)}/${this.unit}`;
  return formattedPrice;
});

// Ensure virtual fields are included when converting to JSON
serviceSchema.set('toJSON', {
  virtuals: true,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
