// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import Stripe from 'npm:stripe';

// const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
//   apiVersion: '2023-10-16',
// });

serve(async (req) => {
  try {
    const { total, items } = await req.json();
    
    // NOTE: This is a placeholder for generating a real Stripe Payment Link
    // In production, you would use the Stripe SDK to create a product/price and then a payment link.
    
    // Example:
    // const price = await stripe.prices.create({
    //   currency: 'usd',
    //   unit_amount: total * 100, // cents
    //   product_data: { name: 'Vox-Offert Invoice' },
    // });
    // const paymentLink = await stripe.paymentLinks.create({ line_items: [{ price: price.id, quantity: 1 }] });
    
    const paymentLink = { url: `https://buy.stripe.com/test_${Math.random().toString(36).substring(7)}` };

    return new Response(JSON.stringify({ payment_link: paymentLink.url }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
