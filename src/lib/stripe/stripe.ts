import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!);

// export const stripe = new Stripe(
//   process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '')
