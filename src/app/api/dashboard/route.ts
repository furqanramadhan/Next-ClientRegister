// src/app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.formData.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
