import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = Number(req.query.locationId);
    if (!locationId) return res.status(400).send("Bad request");
    const menusMenuCategoriesLocations =
      await prisma.menusMenuCategoriesLocations.findMany({
        where: {
          locationId,
          isArchived: false,
        },
      });
    return res.status(200).send(menusMenuCategoriesLocations);
  }
  return res.status(405).send("Method not allowed");
}
