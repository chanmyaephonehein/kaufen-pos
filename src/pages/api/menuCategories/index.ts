import { addLocation } from "@/store/slices/locationsSlice";
import { setMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
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
  } else if (req.method === "PUT") {
    const { id, name, locationIds } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(401).send("Bad Request");
    const menuCategoryId = Number(id);
    const updatedMenuCategory = await prisma.menuCategories.update({
      data: { name },
      where: { id: menuCategoryId },
    });
    if (locationIds.length) {
      const menusMenuCategoriesLocations =
        await prisma.menusMenuCategoriesLocations.findMany({
          where: { menuCategoryId },
        });

      const existingLocationIds = menusMenuCategoriesLocations
        .map((item) => item.locationId)
        .filter((item) => item);

      const addedLocationIds = locationIds.filter(
        (item: number) => !existingLocationIds.includes(item)
      ) as number[];

      const removeLocationIds = existingLocationIds.filter(
        (item) => !locationIds.includes(item)
      ) as number[];

      if (addedLocationIds.length) {
        await prisma.$transaction(
          addedLocationIds.map((item) =>
            prisma.menusMenuCategoriesLocations.createMany({
              data: { menuCategoryId, locationId: item },
            })
          )
        );
      }
      if (removeLocationIds.length) {
        removeLocationIds.forEach(async (item) => {
          const row = await prisma.menusMenuCategoriesLocations.findFirst({
            where: { locationId: item, menuCategoryId },
          });
          if (row) {
            if (row.menuId) {
              await prisma.menusMenuCategoriesLocations.update({
                data: { locationId: null },
                where: { id: row.id },
              });
            } else {
              await prisma.menusMenuCategoriesLocations.delete({
                where: { id: row.id },
              });
            }
          }
        });
      }
    }
    res.status(200).send(updatedMenuCategory);
  }
}
