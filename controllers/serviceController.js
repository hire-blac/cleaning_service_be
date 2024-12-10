import asyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';

// Helper function to format price
const formatPrice = (price, currency = 'GBP', unit = 'hour') => {
  return `${currency === 'GBP' ? '£' : ''}${parseFloat(price).toFixed(2)}/${unit}`;
};

// Controller to handle getting all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();  // Fetch all services from the database

    // Format the price for each service
    const formattedServices = services.map(service => ({
      ...service.toObject(),
      price: formatPrice(service.price, service.currency, service.unit),
    }));

    res.status(200).json(formattedServices);  // Return the formatted services as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
};

// Controller to handle creating a new service
export const createService = asyncHandler(async (req, res) => {
  try {
    const { name, price, currency, unit } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required fields' });
    }

    // Create the new service
    const newService = new Service({
      name,
      price,
      currency: currency || 'GBP',
      unit: unit || 'hour',
    });

    // Save the new service to the database
    await newService.save();

    // Format the price before returning the created service
    const formattedService = {
      ...newService.toObject(),
      price: formatPrice(newService.price, newService.currency, newService.unit),
    };

    res.status(201).json(formattedService);  // Return the created service as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
});
