import { connectDB } from "utils/connectDB";
import User from "models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { verifyAdminToken } from "utils/verifyAdminToken"; // Import the admin token verification function

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Verify the admin token
    const isAdmin = await verifyAdminToken(req);
    if (!isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized: Only admins can register users." },
        { status: 403 } // Forbidden status
      );
    }

    await connectDB();

    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await req.json();

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering user.", error);
    return NextResponse.json(
      { message: "Error occurred while registering user" },
      { status: 500 }
    );
  }
}
