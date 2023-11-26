import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(401).send("Bad Request");
    const table = await prisma.tables.create({ data: { name, locationId } });
    return res.status(200).send(table);
  }
}
