import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Tables } from "@prisma/client";
import React from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import ItemCard2 from "./ItemCard2";

const TableOrderStatus = () => {
  const { isLoading, tables, orderlines, orders } = useAppSelector(appData);
  const currentlLocationId = getSelectedLocationId() as String;

  const currentLocationTables = tables.filter(
    (item) => item.locationId === Number(currentlLocationId)
  ) as Tables[];

  const specificTableId = (tableId: number) => {
    const orderId = orders.find(
      (item) =>
        item.locationId === Number(currentlLocationId) &&
        item.tableId === tableId &&
        item.isPaid === false &&
        item.isArchived == false
    )?.id;
    if (orderId) {
      const menuCount = orderlines
        .filter((item) => item.orderId === orderId)
        .map((item) => item.menuId) as number[];
      const uniqueMenuId = [] as number[];
      menuCount.forEach((menuId) => {
        const isAdded = uniqueMenuId.find((item) => menuId === item);
        if (!isAdded) return uniqueMenuId.push(menuId);
      });
      return uniqueMenuId.length;
    } else {
      return 0 as number;
    }
  };

  const newOrderAdd = (tableId: number) => {
    const orderId = orders.find(
      (item) =>
        item.locationId === Number(currentlLocationId) &&
        item.tableId === tableId &&
        item.isPaid === false &&
        item.isArchived === false
    )?.id;
    if (orderId) {
      const isPending = orderlines.find(
        (item) => item.orderId === orderId && item.status === "PENDING"
      );
      if (isPending) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="col-span-5 flex flex-row flex-wrap">
      {currentLocationTables.map((item) => (
        <div className="" key={item.id}>
          <ItemCard2
            updating={newOrderAdd(item.id)}
            quantity={specificTableId(item.id)}
            noti={specificTableId(item.id) === 0 ? false : true}
            key={item.id}
            href={`/backoffice/orders/${item.id}`}
            title={item.name}
            icon={<TableBarIcon sx={{ my: 3, fontSize: 60 }} />}
          />
        </div>
      ))}
    </div>
  );
};

export default TableOrderStatus;
