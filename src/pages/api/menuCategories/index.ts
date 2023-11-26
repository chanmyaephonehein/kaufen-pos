import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationIds } = req.body;
    const isValid = name && locationIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategories.create({ data: { name } });
    const data = await prisma.$transaction(
      locationIds.map((item: number) =>
        prisma.menusMenuCategoriesLocations.create({
          data: { menuCategoryId: menuCategory.id, locationId: item },
        })
      )
    );
    console.log(data);
    const info = [menuCategory, data];
    return res.status(200).send(info);
  }
}
