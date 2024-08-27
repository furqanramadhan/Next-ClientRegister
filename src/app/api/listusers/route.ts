import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "utils/connectDB";
import { User } from "models/accountModel";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();

    const users = await User.find({}).select("-password");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/listusers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
