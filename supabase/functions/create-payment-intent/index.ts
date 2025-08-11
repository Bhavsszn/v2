// supabase/functions/create-payment-intent/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecret) throw new Error('Missing STRIPE_SECRET_KEY');

const stripe = new Stripe(stripeSecret);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS, status: 204 });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    // You send either price_id OR amount (in cents). Prefer price_id for safety.
    const { price_id, amount, currency = 'usd', metadata } = await req.json();

    let unitAmount = amount;
    if (!unitAmount && price_id) {
      const price = await stripe.prices.retrieve(price_id);
      if (!price.unit_amount) return json({ error: 'Price has no unit_amount' }, 400);
      unitAmount = price.unit_amount;
    }
    if (!unitAmount || typeof unitAmount !== 'number')
      return json({ error: 'Missing amount or price_id' }, 400);

    const pi = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: typeof metadata === 'object' ? metadata : undefined,
    });

    return json({ client_secret: pi.client_secret });
  } catch (e: any) {
    console.error('create-payment-intent error:', e?.message || e);
    return json({ error: 'Failed to create payment intent' }, 500);
  }
});
