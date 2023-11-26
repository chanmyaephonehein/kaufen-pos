import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "POST")) {
    const {
      name,
      price,
      description,
      menuCategoryIds,
      locationId,
      isAvailable,
    } = req.body;
    const isValid = name && price && menuCategoryIds.length && locationId;
    if (!isValid) return res.status(400).send("Bad request");
    const menu = await prisma.menus.create({
      data: { name, price, isAvailable },
    });
    const data = await prisma.$transaction(
      menuCategoryIds.map((item: number) =>
        prisma.menusMenuCategoriesLocations.create({
          data: { menuId: menu.id, menuCategoryId: item, locationId },
        })
      )
    );
    const info = [menu, data];
    return res.status(200).send(info);
  }
}
