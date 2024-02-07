import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/stripe';

const relelvantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.usbscription.created',
  'customer.usbscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (!signature || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error(`Stripe webhook failed to parse event: ${error}`);
    return new Response('Webhook failed to parse event', { status: 400 });
  }

  if (relelvantEvents.has(event.type)) {
    console.log(`Received Stripe event: ${event.type}`);
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          // handle product events
          break;
        case 'price.created':
        case 'price.updated':
          // handle price events
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            // handle subscription checkout
            const subscriptionId = checkoutSession.subscription;
          }
          break;
        default:
          throw new Error('Unhandled event type');
      }
    } catch (error) {
      console.log(error);
      return new Response(
        'Webhook handler failed. View your Nextjs function logs',
        { status: 400 }
      );
    }
  }

  return new Response(JSON.stringify({ received: true }));
}
