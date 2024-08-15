import { connectDB } from "utils/connectDB";
import User from "models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

// Menambahkan tipe untuk parameter req dan nilai yang dikembalikan
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // Parsing JSON request body dan menambahkan tipe untuk hasil parsing
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await req.json();

    // Memeriksa apakah pengguna dengan email atau password yang sama sudah ada
    const exists = await User.findOne({ $or: [{ email }, { password }] });
    if (exists) {
      return NextResponse.json(
        { message: "Username ini sudah digunakan." },
        { status: 500 }
      );
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat pengguna baru di database
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    console.log("Error while registering user.", error);
    return NextResponse.json(
      { message: "Error occured while registering user" },
      { status: 500 }
    );
  }
}
