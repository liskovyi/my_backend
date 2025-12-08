import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo error:", err);
    process.exit(1);
  }
};