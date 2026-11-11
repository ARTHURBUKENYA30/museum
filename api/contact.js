// Vercel serverless endpoint for UPPC Print Heritage Museum contact enquiries.
const RECIPIENT = "museum@uppc.go.ug";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  // Quietly accept honeypot submissions without sending mail.
  if (website) return res.status(200).json({ ok: true });

  if (name.length < 2 || name.length > 100 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 10 || message.length > 5000) {
    return res.status(400).json({ error: "Please provide a valid name, email address and message (10–5,000 characters)." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return res.status(503).json({
      error: "The museum email service is not configured yet. Please email museum@uppc.go.ug directly."
    });
  }

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email,
        subject: `Museum website enquiry from ${name}`,
        text: `UPPC PRINT HERITAGE MUSEUM\nNEW WEBSITE ENQUIRY\n\nVISITOR DETAILS\nName: ${name}\nEmail: ${email}\n\nMESSAGE\n${message}\n\n----------------------------------------\nSent through the UPPC Print Heritage Museum website contact form.`
      })
    });

    if (!delivery.ok) {
      console.error("Museum contact email delivery failed with status:", delivery.status);
      return res.status(502).json({ error: "We could not deliver your message right now. Please try again later or email museum@uppc.go.ug." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Museum contact email request failed:", error);
    return res.status(502).json({ error: "We could not deliver your message right now. Please try again later or email museum@uppc.go.ug." });
  }
}
