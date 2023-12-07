import { prisma } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let isOrderAppRequest =
    req.query.locationId && !isNaN(Number(req.query.locationId));
  if (isOrderAppRequest) {
    const locationId = req.query.locationId;
    const locations = await prisma.locations.findFirst({
      where: { id: Number(locationId), isArchived: false },
    });

    const menusMenuCategoriesLocations =
      await prisma.menusMenuCategoriesLocations.findMany({
        where: { locationId: Number(locationId), isArchived: false },
      });

    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menuId)
      .filter((item) => item !== null) as number[];

    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menuCategoryId
    ) as number[];

    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds }, isArchived: false },
    });

    const menuCategories = await prisma.menuCategories.findMany({
      where: { id: { in: menuCategoryIds }, isArchived: false },
    });

    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: { menuId: { in: menuIds }, isArchived: false },
    });

    const addonCategoryIds = menusAddonCategories.map(
      (item) => item.addonCategoryId
    ) as number[];

    const addonCategories = await prisma.addonCategories.findMany({
      where: { id: { in: addonCategoryIds }, isArchived: false },
    });

    const addons = await prisma.addons.findMany({
      where: { addonCategoryId: { in: addonCategoryIds }, isArchived: false },
    });

    const orders = await prisma.orders.findMany({
      where: { locationId: Number(locationId) },
    });

    const orderIds = orders.map((item) => item.id);

    const orderlines = await prisma.orderlines.findMany({
      where: { orderId: { in: orderIds } },
    });

    res.status(200).send({
      locations: [locations],
      menuCategories,
      menus,
      addonCategories,
      addons,
      menusMenuCategoriesLocations,
      menusAddonCategories,
      orders,
      orderlines,
    });
  } else {
    const session = await getSession({ req });
    if (!session) return res.status(401).send("Unauthorized");
    const user = session.user;
    const email = user?.email as string;
    const name = user?.name as string;
    const userFromDB = await prisma.users.findFirst({ where: { email } });
    if (!userFromDB) {
      const newCompany = await prisma.companies.create({
        data: { name: "Default Companies", address: "Default Address" },
      });
      await prisma.users.create({
        data: { name, email, companyId: newCompany.id },
      });
      const newLocation = await prisma.locations.create({
        data: {
          name: "Default Loaction",
          address: "Default Address",
          companyId: newCompany.id,
        },
      });
      const newMenuCategoriesData = [
        { name: "Default MenuCategory 1" },
        { name: "Default MenuCategory 2" },
      ];
      const newMenusData = [
        { name: "moke-hin-khar", price: 1000 },
        { name: "shan-noodle", price: 2000 },
      ];
      const newMenuCategories = await prisma.$transaction(
        newMenuCategoriesData.map((menuCategory) =>
          prisma.menuCategories.create({ data: menuCategory })
        )
      );
      const newMenus = await prisma.$transaction(
        newMenusData.map((menu) => prisma.menus.create({ data: menu }))
      );
      const newMenusMenuCategoriesLocationsData = [
        {
          menuId: newMenus[0].id,
          menuCategoryId: newMenuCategories[0].id,
          locationId: newLocation.id,
        },
        {
          menuId: newMenus[1].id,
          menuCategoryId: newMenuCategories[1].id,
          locationId: newLocation.id,
        },
      ];
      const newMenusMenuCategoriesLocations = await prisma.$transaction(
        newMenusMenuCategoriesLocationsData.map((item) =>
          prisma.menusMenuCategoriesLocations.create({ data: item })
        )
      );
      const newAddonCategoriesData = [{ name: "Drink" }, { name: "Size" }];
      const newAddonCategories = await prisma.$transaction(
        newAddonCategoriesData.map((addonCategory) =>
          prisma.addonCategories.create({ data: addonCategory })
        )
      );
      const newMenusAddonCategoriesData = [
        { menuId: newMenus[0].id, addonCategoryId: newAddonCategories[0].id },
        { menuId: newMenus[1].id, addonCategoryId: newAddonCategories[1].id },
      ];
      const newMenusAddonCategories = await prisma.$transaction(
        newMenusAddonCategoriesData.map((item) =>
          prisma.menusAddonCategories.create({ data: item })
        )
      );
      const newAddonsData = [
        { name: "Cola", price: 800, addonCategoryId: newAddonCategories[0].id },
        {
          name: "Pepsi",
          price: 800,
          addonCategoryId: newAddonCategories[0].id,
        },
        { name: "Normal", price: 0, addonCategoryId: newAddonCategories[1].id },
        {
          name: "Large",
          price: 1000,
          addonCategoryId: newAddonCategories[1].id,
        },
      ];
      const newAddons = await prisma.$transaction(
        newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
      );
      return res.send({
        menuCategories: newMenuCategories,
        menus: newMenus,
        addonCategories: newAddonCategories,
        adddons: newAddons,
        locations: newLocation,
        menusMenuCategoriesLocations: newMenusMenuCategoriesLocations,
        company: newCompany,
        menusAddonCategories: newMenusAddonCategories,
        orders: [],
        orderlines: [],
        tables: [],
      });
    } else {
      const companyId = userFromDB.companyId as number;
      const locations = await prisma.locations.findMany({
        where: {
          companyId,
          isArchived: false,
        },
      });
      const locationIds = locations.map((location) => location.id);
      const menusMenuCategoriesLocations =
        await prisma.menusMenuCategoriesLocations.findMany({
          where: {
            locationId: {
              in: locationIds,
            },
            isArchived: false,
          },
        });
      const menuIds = menusMenuCategoriesLocations
        .map((item) => item.menuId)
        .filter((item) => item !== null) as number[];
      const menuCategoryIds = menusMenuCategoriesLocations.map(
        (item) => item.menuCategoryId
      ) as number[];
      const menuCategories = await prisma.menuCategories.findMany({
        where: {
          id: {
            in: menuCategoryIds,
          },
          isArchived: false,
        },
      });
      const menus = await prisma.menus.findMany({
        where: {
          id: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const menusAddonCategories = await prisma.menusAddonCategories.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const addonCategoryIds = menusAddonCategories.map(
        (item) => item.addonCategoryId
      ) as number[];
      const addonCategories = await prisma.addonCategories.findMany({
        where: {
          id: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const addons = await prisma.addons.findMany({
        where: {
          addonCategoryId: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const tables = await prisma.tables.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
        },
      });
      const company = await prisma.companies.findFirst({
        where: {
          id: companyId,
        },
      });
      const orders = await prisma.orders.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
        },
      });
      const orderIds = orders.map((item) => item.id);
      const orderlines = await prisma.orderlines.findMany({
        where: {
          orderId: {
            in: orderIds,
          },
        },
      });
      res.send({
        menus,
        menuCategories,
        addons,
        addonCategories,
        locations,
        menusAddonCategories,
        menusMenuCategoriesLocations,
        company,
        tables,
        orders,
        orderlines,
      });
    }
  }
}
