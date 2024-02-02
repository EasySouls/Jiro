'use server';

import { createClient } from '../supabase/server';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getSession } from '../supabase';

export async function checkoutAction(credits: number) {
  const supabase = createClient(cookies());
  const session = await getSession();

  if (!session) {
    throw new Error('You must be logged in to make a purchase');
  }

  const priceIds: Record<number, string> = {
    30: process.env.STRIPE_PRICE_ID_30!,
    60: process.env.STRIPE_PRICE_ID_60!,
    100: process.env.STRIPE_PRICE_ID_100!,
  };
  const priceId = priceIds[credits];

  if (!priceId) {
    throw new Error('Invalid price ID');
  }

  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'revolut_pay'],
    metadata: {
      userId: session.user.id,
      credits: credits,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_NAME}/`,
    cancel_url: `${process.env.HOST_NAME}/pricing`,
  });
}
