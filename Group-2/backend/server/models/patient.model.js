import mongoose from "mongoose";

const AddressInfoSchema = new mongoose.Schema(
    {
        address: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
    },
    { _id: false }
);

const PatientSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        gender: { type: String, enum: ["Male", "Female"], trim: true },
        dob: { type: String, match: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
        physician: { type: mongoose.Schema.Types.ObjectId, ref: "Physician", required: true },
        addressInfo: { type: AddressInfoSchema, default: () => ({}) },
        status: { type: String, enum: ["ACTIVE", "DELETED"], default: "ACTIVE" },
    },
    { timestamps: true }
);

PatientSchema.index({ email: 1 }, { unique: true });
PatientSchema.index({ physician: 1 });

export const Patient = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
