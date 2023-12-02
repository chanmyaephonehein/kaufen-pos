import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && price && addonCategoryId;
    if (!isValid) return res.status(401).send("Bad Request");
    const addon = await prisma.addons.create({
      data: { name, price, addonCategoryId: Number(addonCategoryId) },
    });
    return res.status(200).send(addon);
  } else if (req.method === "PUT") {
    const { id, name, price } = req.body;
    if (!id || !name || !price) return res.status(401).send("Bad Request");
    const addon = await prisma.addons.update({
      data: { name, price },
      where: { id },
    });
    res.status(200).send(addon);
  }
}
