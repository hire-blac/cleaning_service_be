import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handlePaymentComplete = async (req, res) => {
  const { payment_intent } = req.query;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (paymentIntent.status === 'succeeded') {
      res.status(200).json({ message: 'Payment was successful!', paymentIntent });
    } else {
      res.status(400).json({ error: 'Payment was not successful.', status: paymentIntent.status });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify payment intent.', details: error.message });
  }
};
