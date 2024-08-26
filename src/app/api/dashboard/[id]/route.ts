import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma, Status } from "@prisma/client";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, action } = await request.json();
    if (typeof id !== "number" || !["accept", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const status = action === "accept" ? Status.Accepted : Status.Rejected;

    const updateData: Prisma.FormDataUpdateArgs = {
      where: { id },
      data: { status },
    };

    if (session.user.role !== "admin") {
      const existingData = await prisma.formData.findUnique({ where: { id } });
      if (existingData?.companyName !== session.user.companyName) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    const updatedData = await prisma.formData.update(updateData);
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
