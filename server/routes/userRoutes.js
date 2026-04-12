import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/clerkAuth.js";
import { getUserData, getUserJobApplications, applyForJob, updateUserResume } from "../controllers/userController.js";
import upload from "../config/multer.js";

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

//get user data
router.get('/user', requireAuth, getUserData);

//apply for a job
router.post('/apply', applyForJob );

//Get applied jobs data
router.get('/applications',getUserJobApplications)

//update user profile
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
