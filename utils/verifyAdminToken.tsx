import { NextRequest } from "next/server";

export async function verifyAdminToken(req: NextRequest): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN;
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  return token === adminToken;
}
