import { prisma } from "@/utils/server";
import { Addons } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && menuIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const addonCategory = await prisma.addonCategories.create({
      data: { name, isRequired: isRequired },
    });
    const data = await prisma.$transaction(
      menuIds.map((item: number) =>
        prisma.menusAddonCategories.create({
          data: { menuId: item, addonCategoryId: addonCategory.id },
        })
      )
    );
    const info = [addonCategory, data];
    return res.status(200).send(info);
  } else if (req.method === "PUT") {
    const { id, name, isRequired, addonIds, addons } = req.body;
    const isValid = id && name;
    if (!isValid) res.status(200).send("Bad request");
    const addonCategory = await prisma.addonCategories.update({
      data: { name, isRequired },
      where: { id },
    });

    if (addonIds.length) {
      const oldAddons = await prisma.addons.findMany({
        where: { addonCategoryId: id },
      });

      const existingAddonIds = oldAddons.map((item) => item.id) as number[];
      const addedAddons = addons.filter((item: Addons) => {
        oldAddons.find((i: Addons) => {
          if (i.id !== item.id) return i;
        });
      }) as Addons[];

      const removeAddonIds = existingAddonIds.filter(
        (item: number) => !addonIds.includes(item)
      ) as number[];

      if (addedAddons.length) {
        await prisma.$transaction(
          addedAddons.map((item: Addons) =>
            prisma.addons.create({
              data: {
                name: item.name,
                price: item.price,
                addonCategoryId: id,
              },
            })
          )
        );
      }
      if (removeAddonIds.length) {
        await prisma.addons.deleteMany({
          where: {
            addonCategoryId: id,
            id: { in: removeAddonIds },
          },
        });
      }
    }

    return res.status(200).send(addonCategory);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).send("Bad request");
    await prisma.addonCategories.update({
      data: { isArchived: true },
      where: { id: Number(id) },
    });
    return res.status(200).send("OK");
  }
}
