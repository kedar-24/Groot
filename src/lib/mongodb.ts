import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "my_database", // optional, specify if not in URI
    });

    isConnected = true;
    console.log("✅ MongoDB connected:", db.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}