import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const { id, action } = await request.json();

    if (typeof id !== "number" || !["accept", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const status = action === "accept" ? "Accepted" : "Rejected";

    const updatedData = await prisma.formData.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
