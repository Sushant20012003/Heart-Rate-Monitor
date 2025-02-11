import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength:6 },
    role: { type: String, enum: ["doctor", "nurse", "staff"], default: "staff" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
