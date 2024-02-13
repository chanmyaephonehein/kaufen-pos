import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const addons = await prisma.addons.findMany({
      where: {
        isArchived: false,
      },
    });
    return res.status(200).send(addons);
  }
  return res.status(405).send("Method not allowed");
}
