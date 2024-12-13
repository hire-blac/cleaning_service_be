import Stripe from 'stripe';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';


export const getCheckoutSession = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Booking for ' + bookingDetails.serviceName,
            },
            unit_amount: bookingDetails.price * 100, // Convert to cents
          },
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/cancel`,
    });

    res.status(200).json({ success: true, session });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating checkout session',
      error: err.message,
    });
  }
};





