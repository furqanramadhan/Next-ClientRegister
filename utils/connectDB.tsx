import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    // Define the MongoDB URI and the database name from environment variables
    const mongoUri = process.env.MONGO_URI as string;
    const dbName = process.env.DB_NAME || "default_db";

    // Connect to MongoDB using the URI and database name
    await mongoose.connect(mongoUri, {
      dbName, // Specify the database name to use
    });

    console.log(`Connection to DB "${dbName}" Successful`);
  } catch (error) {
    console.error("Error while Connecting to DB", error);
    throw new Error("Failed to connect to the database");
  }
}
