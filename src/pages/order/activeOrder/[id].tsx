import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Orderlines } from "@prisma/client";

const ActiveOrder = () => {
  const { orders, orderlines, menus, addons } = useAppSelector(appData);
  const router = useRouter();
  const orderId = router.query.id as string;
  const validOrderlines = orderlines.filter(
    (item: any) => item.orderId === Number(orderId)
  ) as Orderlines[];
  const validOrder = orders.find((item: any) => item.id === Number(orderId));
  const header = ["No", "Menu", "Addon", "Quantity", "Status"];

  //unique set
  const uniqueItemsMap = validOrderlines.reduce((uniqueMap, item) => {
    uniqueMap.set(item.itemId, item);
    return uniqueMap;
  }, new Map<string, Orderlines>());
  const uniqueItems: Orderlines[] = Array.from(uniqueItemsMap.values());

  const renderMenu = (item: Orderlines) => {
    const menu = menus.find((i) => i.id === item.menuId);
    return (
      <TableCell component="th" scope="row" align="center">
        {menu?.name}
      </TableCell>
    );
  };

  const renderAddon = (item: Orderlines) => {
    const ids = orderlines
      .filter((i) => i.itemId === item.itemId)
      .map((f) => f.addonId);
    const result = addons.filter((item) => ids.includes(item.id));
    return (
      <TableCell align="center">
        {result.length ? (
          result.map((i) => <div key={i.id}>{i.name}</div>)
        ) : (
          <div>No Addon</div>
        )}
      </TableCell>
    );
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Typography variant="h4">Table: {validOrder?.tableId}</Typography>
      <Typography variant="h6">
        {validOrder?.isPaid ? "Check Out" : "Not Paid"}
      </Typography>
      <Typography variant="h5">Total: {validOrder?.price} MMK</Typography>
      <TableContainer sx={{ minWidth: 650, maxWidth: 800 }} component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((item) => (
                <TableCell key={item} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueItems.map((item) => {
              const num = 1 + uniqueItems.indexOf(item);
              return (
                <TableRow
                  key={item?.itemId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{num}</TableCell>
                  {renderMenu(item)}
                  {renderAddon(item)}
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveOrder;
