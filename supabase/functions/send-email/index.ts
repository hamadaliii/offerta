// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// Use a library like nodemailer or an API like Resend to send emails
// import { Resend } from "npm:resend";

// const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  try {
    const { clientEmail, pdfUrl, paymentLink } = await req.json();

    // Placeholder for email sending logic via SMTP or Email API (e.g., Resend, Sendgrid)
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: clientEmail,
    //   subject: 'Your Quote from Vox-Offert',
    //   html: `<p>Please find your quote attached. You can pay using this link: <a href="${paymentLink}">Pay Now</a></p>`,
    // });

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
