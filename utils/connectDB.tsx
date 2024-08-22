import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Admin } from "models/accountModel";
const saltRounds = 10;

async function ensureAdminExists() {
  try {
    const adminUser = await Admin.findOne({ email: "admin@example.com" });
    if (!adminUser) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        throw new Error(
          "ADMIN_PASSWORD is not defined in environment variables"
        );
      }

      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

      await Admin.create({
        username: "admin_test",
        email: "admin@example.com",
        password: hashedPassword,
      });

      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

export async function connectDB(): Promise<typeof mongoose> {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoUri)
      throw new Error("MONGO_URI is not defined in environment variables");
    if (!dbName)
      throw new Error("DB_NAME is not defined in environment variables");

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri, {
        dbName,
      });
      console.log(`Connection to DB "${dbName}" Successful`);
      await ensureAdminExists();
    }
    return mongoose;
  } catch (error) {
    console.error("Error while Connecting to DB", error);
    throw new Error("Failed to connect to the database");
  }
}
