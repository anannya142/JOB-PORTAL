import { clerkClient } from "@clerk/clerk-sdk-node";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const session = await clerkClient.verifyToken(token);

    req.clerkUserId = session.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
