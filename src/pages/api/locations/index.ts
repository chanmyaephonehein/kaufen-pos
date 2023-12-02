import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, address, companyId } = req.body;
    const isValid = name && address && companyId;
    if (!isValid) return res.status(200).send("Bad Request");
    const location = await prisma.locations.create({
      data: { name, address, companyId },
    });
    return res.status(200).send(location);
  } else if (req.method === "PUT") {
    const { id, name, address, companyId } = req.body;
    if (!id || !name || !address || !companyId)
      return res.status(400).send("Bad Request");
    const location = await prisma.locations.update({
      data: { name, address },
      where: { id, companyId },
    });
    return res.status(200).send(location);
  }
}
