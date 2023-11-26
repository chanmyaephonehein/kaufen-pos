import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationIds } = req.body;
    const isValid = name && locationIds;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategories.create({ data: { name } });
    const menusMenuCategoriesLocationsData = locationIds.map(
      (item: number) => ({
        menuCategoryId: menuCategory.id,
        locationId: item,
      })
    );
    await prisma.menusMenuCategoriesLocations.createMany({
      data: menusMenuCategoriesLocationsData,
    });
    return res.status(200).send(menuCategory);
  }
}
