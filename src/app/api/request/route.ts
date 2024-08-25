import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const status = data.status || "Waiting";

    const newFormData = await prisma.formData.create({
      data: {
        companyName: data.companyName,
        clientName: data.clientName,
        description: data.description,
        companyImage: data.companyImage,
        position: data.position,
        contractNumber: data.contractNumber,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        insuranceNumber: data.insuranceNumber,
        requestDate: new Date(data.requestDate),
        status: status as any,
      },
    });

    console.log("New form data created:", newFormData);

    return NextResponse.json(newFormData);
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
