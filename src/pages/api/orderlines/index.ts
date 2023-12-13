import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const orderlines = await prisma.orderlines.findMany();
    return res.status(200).send(orderlines);
  }
  return res.status(405).send("Method not allowed");
}
