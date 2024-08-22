import { connectDB } from "utils/connectDB";
import { User } from "models/accountModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { z } from "zod";

// Schema validasi untuk data yang diterima dari form
const FormSchema = z.object({
  companyName: z.string(),
  fullName: z.string(),
  position: z.string(),
  userName: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Fungsi untuk meng-hash password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Endpoint POST untuk menambahkan pengguna baru
export async function POST(req: NextRequest) {
  try {
    // Mengambil data dari permintaan
    const data = await req.json();
    const parsedData = FormSchema.parse(data);

    // Koneksi ke database
    await connectDB();

    // Mengecek apakah username atau email sudah ada
    const existingUser = await User.findOne({
      $or: [{ userName: parsedData.userName }, { email: parsedData.email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email is already in use." },
        { status: 400 }
      );
    }

    // Meng-hash password
    const hashedPassword = await hashPassword(parsedData.password);

    // Menyimpan pengguna baru ke database
    await User.create({
      companyName: parsedData.companyName,
      fullName: parsedData.fullName,
      position: parsedData.position,
      userName: parsedData.userName,
      email: parsedData.email,
      password: hashedPassword,
    });

    // Mengirim respons sukses
    return NextResponse.json(
      { message: "User added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);

    if (error instanceof z.ZodError) {
      // Menangani kesalahan validasi
      return NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      // Menangani kesalahan umum
      return NextResponse.json(
        { message: `Error occurred while adding user: ${error.message}` },
        { status: 500 }
      );
    } else {
      // Menangani kesalahan tidak dikenal
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
