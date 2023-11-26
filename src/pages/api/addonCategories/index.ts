import { prisma } from "@/utils/server";
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
  }
}
