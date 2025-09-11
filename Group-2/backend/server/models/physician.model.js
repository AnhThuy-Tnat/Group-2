import mongoose from "mongoose";

const PhysicianSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        gender: { type: String, enum: ["Male", "Female"], trim: true },
        dob: { type: String, match: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
    },
    { timestamps: true }
);

PhysicianSchema.index({ email: 1 }, { unique: true });

export const Physician = mongoose.models.Physician || mongoose.model("Physician", PhysicianSchema);
