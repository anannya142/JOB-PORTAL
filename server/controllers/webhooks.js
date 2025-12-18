
import { Clerk } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export const clerkWebhooks = async (req, res) => {
  try {
    const signature = req.headers['clerk-signature'];
    const payload = req.body; // raw body required!

    // Verify webhook
    const event = clerk.webhooks.verify(payload, signature, process.env.CLERK_WEBHOOK_SECRET);

    if (event.type === "user.created") {
      const clerkId = event.data.id;
      const exists = await User.findOne({ clerkId });
      if (!exists) await User.create({ clerkId });
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    res.status(400).json({ error: "Webhook verification failed" });
  }
};
