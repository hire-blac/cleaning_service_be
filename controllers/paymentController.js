import stripePackage from 'stripe';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY); 

// @desc    Create a Stripe Checkout session
// @route   POST /api/payment/create-checkout-session
// @access  Public
const createCheckoutSession = asyncHandler(async (req, res) => {
  const { services, email } = req.body; 

  
  const line_items = services.map((service) => ({
    price_data: {
      currency: 'gbp', 
      product_data: {
        name: service.name,
      },
      unit_amount: service.price * 100, 
    },
    quantity: 1, 
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`, 
      customer_email: email, // 
    });

    res.status(200).json({ id: session.id }); // Send the session ID to the frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'gbp' } = req.body;

    // Validate amount
    if (!amount || typeof amount !== 'number') {
      return res.status(400).send({ error: 'Invalid or missing amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency,
    });

    // Respond with the client secret
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
};

export { createCheckoutSession , createPaymentIntent};
