import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { orderId, value } = req.body;
    await prisma.orders.updateMany({
      data: { isPaid: value },
      where: { id: orderId },
    });
    return res.status(200).send("OK");
  } else if (req.method === "GET") {
    const order = await prisma.orders.findMany();
    return res.status(200).send(order);
  }
  return res.status(405).send("Method not allowed");
}
