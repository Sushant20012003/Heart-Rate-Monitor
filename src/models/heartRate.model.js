import mongoose from "mongoose";

const heartRateSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    bpm: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  }
);

export const HeartRate = mongoose.model("HeartRate", heartRateSchema);
