import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const orderlines = await prisma.orderlines.findMany();
    return res.status(200).send(orderlines);
  } else if (req.method === "PUT") {
    const { itemId, status } = req.body;
    const isValid = itemId && status;
    if (!isValid) return res.status(400).send("Bad Request");
    const existOrderline = await prisma.orderlines.findFirst({
      where: { itemId },
    });
    if (!existOrderline) return res.status(405).send("Method not allowed");
    await prisma.orderlines.updateMany({ data: { status }, where: { itemId } });
    return res.status(200).send("OK");
  }
  return res.status(405).send("Method not allowed");
}
