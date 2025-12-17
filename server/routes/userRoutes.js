import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/clerkAuth.js";

const router = express.Router();

router.post("/sync", requireAuth, async (req, res) => {
  try {
    const clerkId = req.clerkUserId;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({ clerkId });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "User sync failed" });
  }
});

export default router;
