import { CartItem } from "@/store/slices/cartSlice";
import { getCartTotalPrice } from "@/utils/client";
import { prisma } from "@/utils/server";
import { OrderStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let isOrderAppRequest =
    req.query.locationId && !isNaN(Number(req.query.locationId));
  if (isOrderAppRequest) {
    const method = req.method;
    if (method === "GET") {
      const locationId = req.query.locationId;
      const locations = await prisma.locations.findFirst({
        where: { id: Number(locationId), isArchived: false },
      });

      const tableId = req.query.tableId;
      const existingTable = await prisma.tables.findFirst({
        where: { id: Number(tableId), isArchived: false },
      });

      if (!existingTable) return res.status(400).send("Bad Request");

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
    }
    if (method === "POST") {
      const { items } = req.body;
      const { locationId, tableId } = req.query;
      const isValid = items && locationId && tableId;
      if (!isValid) return res.status(400).send("Bad Request");
      const idLocation = Number(locationId);
      const idTable = Number(tableId);
      const unPaidOrder = await prisma.orders.findFirst({
        where: { locationId: idLocation, tableId: idTable, isPaid: false },
      });
      if (!unPaidOrder) {
        const orderData = {
          locationId: Number(locationId),
          tableId: Number(tableId),
          isPaid: false,
          price: getCartTotalPrice(items),
        };
        const order = await prisma.orders.create({ data: orderData });
        items.forEach(async (item: CartItem) => {
          const menu = item.menu;
          const addon = item.addon;
          if (addon.length) {
            const orderlineData = addon.map((i: any) => ({
              menuId: menu.id,
              addonId: i.id,
              itemId: item.id,
              orderId: order.id,
              quantity: item.quantity,
              status: OrderStatus.PENDING,
            }));
            await prisma.orderlines.createMany({ data: orderlineData });
          } else {
            await prisma.orderlines.create({
              data: {
                itemId: item.id,
                menuId: item.menu.id,
                orderId: order.id,
                quantity: item.quantity,
                status: OrderStatus.PENDING,
              },
            });
          }
        });
        return res.status(200).send(order);
      } else {
        items.forEach(async (item: CartItem) => {
          const existingOrder = await prisma.orders.findFirst({
            where: {
              isPaid: false,
              tableId: Number(tableId),
              locationId: Number(locationId),
            },
          });
          const originalPrice = existingOrder?.price;
          const newPrice = getCartTotalPrice(items);
          if (existingOrder && originalPrice) {
            const totalPrice = originalPrice + newPrice;
            await prisma.orders.updateMany({
              data: { price: totalPrice },
              where: {
                isPaid: false,
                tableId: Number(tableId),
                locationId: Number(locationId),
              },
            });
          }
          const addon = item.addon;
          if (addon.length) {
            const orderlineData = addon.map((i: any) => ({
              orderId: unPaidOrder.id,
              menuId: item.menu.id,
              addonId: i.id,
              itemId: item.id,
              quantity: item.quantity,
              status: OrderStatus.PENDING,
            }));
            await prisma.orderlines.createMany({ data: orderlineData });
          } else {
            await prisma.orderlines.create({
              data: {
                orderId: unPaidOrder.id,
                menuId: item.menu.id,
                itemId: item.id,
                quantity: item.quantity,
              },
            });
          }
        });
        return res.status(200).send(unPaidOrder);
      }
    }
  } else {
    const session = await getSession({ req });
    if (!session) return res.status(401).send("Unauthorized");
    const user = session.user;
    const email = user?.email as string;
    const name = user?.name as string;
    const userFromDB = await prisma.users.findFirst({ where: { email } });
    if (!userFromDB) {
      const newCompany = await prisma.companies.create({
        data: { name: "Default Company", address: "Default Address" },
      });
      await prisma.users.create({
        data: { name, email, companyId: newCompany.id },
      });
      const newLocation = await prisma.locations.create({
        data: {
          name: "Default Location",
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
