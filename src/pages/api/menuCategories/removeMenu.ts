import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { menuId, menuCategoryId, locationId } = req.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return res.status(400).send("Bad request");
    await prisma.menusMenuCategoriesLocations.deleteMany({
      where: {
        menuId,
        menuCategoryId: Number(menuCategoryId),
        locationId: Number(locationId),
      },
    });
  }
  return res.status(405).send("Method not allowed");
}
