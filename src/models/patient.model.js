import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    contact: {
      phone: { type: String, required: true },
      email: { type: String },
    },
    medicalHistory: [
      {
        condition: { type: String },
        diagnosedOn: { type: Date },
        status: { type: String, enum: ["ongoing", "resolved"], default: "ongoing" },
      },
    ],
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);


export const Patient = mongoose.model("Patient", patientSchema);
