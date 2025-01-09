import { MostOrderedMenu } from "@/store/slices/dataStatisticsSlice";
import { prisma } from "@/utils/server";
import { Orderlines } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = req.query.status;
  if (status === "1") {
    if (req.method === "POST") {
      const locationId = Number(req.query.locationId);
      const { date } = req.body;
      // console.log(date);
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      const inDateOrder = await prisma.orders.findMany({
        where: {
          updatedAt: { gte: startDate, lte: endDate },
          locationId: Number(locationId),
          isPaid: true,
        },
      });
      // console.log(inDateOrder);
      const orderIds = inDateOrder.map((item) => item.id);

      const inDateOrderlines = await prisma.orderlines.findMany({
        where: { orderId: { in: orderIds } },
      });

      const uniqueOrderlines = [] as Orderlines[];
      inDateOrderlines.forEach((item) => {
        const isExist = uniqueOrderlines.find((i) => i.itemId === item.itemId);
        if (isExist) {
          return;
        } else {
          uniqueOrderlines.push(item);
        }
      });

      const inDateOrderPrice = inDateOrder.map(
        (item) => item.price
      ) as number[];

      const menuData = await prisma.menus.findMany(); // Fetch all menus once

      const mostOrderedMenu = uniqueOrderlines.reduce((prev, curr) => {
        const found = prev.find((item) => item.menuId === curr.menuId);
        if (found) {
          found.quantity += curr.quantity;
        } else {
          const menuName =
            menuData.find((menu) => menu.id === curr.menuId)?.name ||
            "Unknown Menu";
          prev.push({
            menuId: curr.menuId,
            name: menuName,
            quantity: curr.quantity,
          });
        }
        return prev;
      }, [] as MostOrderedMenu[]);

      const status = 1;
      const customerCount = orderIds.length;
      const totalDishes = uniqueOrderlines.length;
      const revenue = inDateOrderPrice.reduce((prev, curr) => {
        return (prev += curr);
      }, 0);
      const profits = revenue;

      const returnValue = {
        locationId,
        status,
        customerCount,
        totalDishes,
        revenue,
        profits,
        mostOrderedMenu,
      };

      // console.log(inDateOrderlines);
      return res.status(200).send(returnValue);
    }
  } else if (status === "2") {
  } else if (status === "3") {
  } else if (status === "4") {
  } else if (status === "5") {
  } else {
  }
}
