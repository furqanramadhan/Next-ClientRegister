import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.formData.findMany({
      where: { status: "Rejected" },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
