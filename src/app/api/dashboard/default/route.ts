import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.formData.findMany(); // Coba query tanpa filter
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error); // Log error
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
