import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { menuCategoryId, menuId, locationId } = req.body;
    const isValid = menuCategoryId && menuId && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    await prisma.menusMenuCategoriesLocations.create({
      data: {
        menuCategoryId: Number(menuCategoryId),
        menuId,
        locationId: Number(locationId),
      },
    });
    return res.send(200);
  }
  res.status(405).send("Method not allowed");
}
