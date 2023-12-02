import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    const table = await prisma.tables.create({ data: { name, locationId } });
    return res.status(200).send(table);
  } else if (req.method === "PUT") {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).send("Bad Request");
    const table = await prisma.tables.update({ data: { name }, where: { id } });
    return res.status(200).send(table);
  }
}
