import { connectDB } from "utils/connectDB";
import { User } from "models/accountModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "utils/verifyAdminToken";

const FormSchema = z.object({
  companyName: z.string(),
  fullName: z.string(),
  position: z.string(),
  userName: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = FormSchema.parse(data);

    const isAdmin = await verifyAdminToken(req);
    if (!isAdmin) {
      console.error("Unauthorized access attempt");
      return NextResponse.json(
        { message: "Unauthorized: Only admins can add users." },
        { status: 403 }
      );
    }
    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ userName: parsedData.userName }, { email: parsedData.email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email is already in use." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(parsedData.password);

    await User.create({
      companyName: parsedData.companyName,
      fullName: parsedData.fullName,
      position: parsedData.position,
      userName: parsedData.userName,
      email: parsedData.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error occurred while adding user: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
