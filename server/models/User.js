
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
