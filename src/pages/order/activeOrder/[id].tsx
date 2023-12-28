import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Orderlines, Orders } from "@prisma/client";
import { emptyCart } from "@/store/slices/cartSlice";
import { fetchOrderlines } from "@/store/slices/orderlinesSlice";
import { fetchOrders } from "@/store/slices/ordersSlice";

const ActiveOrder = () => {
  const { orders, orderlines, menus, addons } = useAppSelector(appData);
  const router = useRouter();
  const { query, isReady } = router;
  const orderId = router.query.id as string;
  const validOrderlines = orderlines.filter(
    (item: any) => item.orderId === Number(orderId)
  ) as Orderlines[];
  const validOrder = orders.find((item: any) => item.id === Number(orderId));
  const header = ["No", "Menu", "Addon", "Quantity", "Status"];

  //unique set
  // const uniqueItemsMap = validOrderlines.reduce((uniqueMap, item) => {
  //   uniqueMap.set(item.itemId, item);
  //   return uniqueMap;
  // }, new Map<string, Orderlines>());
  // const uniqueItems: Orderlines[] = Array.from(uniqueItemsMap.values());

  const ids = [] as Orderlines[];
  validOrderlines.forEach((item) => {
    const hasAdded = ids.find((i) => i.itemId === item.itemId);
    if (!hasAdded) ids.push(item);
  });

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(emptyCart());
    const intervalId = setInterval(() => {
      dispatch(fetchOrderlines(""));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchOrders(""));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  // if (isReady && !validOrder) {
  // router.push({ pathname: "/order", query });
  // }
  // }, [isReady, validOrder]);

  return (
    <div className="flex flex-col items-center mt-10 relative">
      <div className="fixed right-10  top-1/3">
        <Typography variant="h4">Table: {validOrder?.tableId}</Typography>
        <Typography variant="h6">
          {validOrder?.isPaid ? "Check Out" : "Not Paid"}
        </Typography>
        <Typography variant="h5">Total: {validOrder?.price} MMK</Typography>
      </div>
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
            {ids.map((item) => {
              const num = 1 + ids.indexOf(item);
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
      <div className="fixed right-20 top-1/2">
        <Button
          variant="contained"
          onClick={() => router.push({ pathname: "/order", query })}
        >
          Buy More
        </Button>
      </div>
    </div>
  );
};

export default ActiveOrder;
