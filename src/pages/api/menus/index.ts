import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
  } else if (req.method === "PUT") {
    const { id, name, price, addonCategoryIds } = req.body;
    const isValid = id && name && price;
    console.log(isValid);
    if (!isValid) return res.status(401).send("Bad Request");
    const updatedMenus = await prisma.menus.update({
      data: { name, price },
      where: { id },
    });
    if (addonCategoryIds.length) {
      const addonCategories = await prisma.menusAddonCategories.findMany({
        where: { menuId: id },
      });
      const existingAddonCategoryIds = addonCategories.map(
        (item) => item.addonCategoryId
      ) as number[];

      const addedAddonCategoryIds = addonCategoryIds.filter(
        (item: number) => !existingAddonCategoryIds.includes(item)
      );

      const removeAddonCategoryIds = existingAddonCategoryIds.filter(
        (item: number) => !addonCategoryIds.includes(item)
      );

      if (addedAddonCategoryIds.length) {
        await prisma.$transaction(
          addedAddonCategoryIds.map((item: number) =>
            prisma.menusAddonCategories.create({
              data: { menuId: id, addonCategoryId: item },
            })
          )
        );
      }
      if (removeAddonCategoryIds.length) {
        await prisma.menusAddonCategories.deleteMany({
          where: {
            menuId: id,
            addonCategoryId: { in: removeAddonCategoryIds },
          },
        });
      }
    }
    return res.status(200).send(updatedMenus);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).send("Bad request");
    await prisma.menusMenuCategoriesLocations.deleteMany({
      where: { menuId: Number(id) },
    });
    await prisma.menusAddonCategories.deleteMany({
      where: { menuId: Number(id) },
    });
    await prisma.menus.deleteMany({ where: { id: Number(id) } });
    return res.status(200).send("OK");
  }
}
