// import { clerkClient } from "@clerk/clerk-sdk-node";

// export const requireAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "No token" });
//     }

//     const token = authHeader.split(" ")[1];
//     const session = await clerkClient.verifyToken(token);

//     req.clerkUserId = session.sub;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };
import { verifyToken } from "@clerk/backend";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // ✅ THIS is your Clerk user ID
    req.clerkUserId = payload.sub;

    next();
  } catch (err) {
    console.log("Auth error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};