// config/dbconn.js
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { Patient } from "../models/patient.model.js";

const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
    dbName: "test", // hoặc db bạn muốn dùng
};

dotenv.config();

export async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URL, clientOptions);

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
