import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connection to DB Successful");
  } catch (error) {
    console.error("Error while Connecting to DB", error);
    throw new Error("Failed to connect to the database");
  }
}
