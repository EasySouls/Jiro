import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('API_ROUTE_SECRET');
  if (query !== process.env.API_ROUTE_SECRET) {
    return new NextResponse('Unauthorized to call this API', { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.record.email) {
      return new NextResponse('Email is required', { status: 400 });
    } else if (!data.record.id) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const customer = await stripe.customers.create({
      email: data.record.email,
    });

    const supabase = createClient(cookies());

    const { error } = await supabase
      .from('profiles')
      .update({
        stripe_customer: customer.id,
      })
      .eq('id', data.record.id);

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse(JSON.stringify(customer));
  } catch (error) {
    return new NextResponse("Couldn't create a new Stripe customer", {
      status: 500,
    });
  }
}
