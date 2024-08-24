import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { action } = req.body;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PATCH") {
    try {
      const status = action === "accept";
      await prisma.formData.update({
        where: { id: Number(id) },
        data: { status },
      });
      res
        .status(200)
        .json({ message: `Data ${status ? "Accepted" : "Rejected"}` });
    } catch (error) {
      res.status(500).json({ error: "Error updating data" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
