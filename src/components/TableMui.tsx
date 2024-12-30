import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateOrderlineStatus } from "@/store/slices/orderlinesSlice";
import { updateOrderStatus } from "@/store/slices/ordersSlice";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AddonCategories,
  Addons,
  Menus,
  OrderStatus,
  Orderlines,
  Orders,
  Tables,
} from "@prisma/client";
import { Fragment, useState } from "react";
import { config } from "@/config";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const data = ["Order Id", "Table ID", "No. of Menu", "Total Price", "Is Paid"];

interface Props {
  menus: Menus[];
  addonCategories: AddonCategories[];
  addons: Addons[];
  orders: Orders;
  orderlines: Orderlines[];
  tables: Tables[];
}

function Row({
  menus,
  addonCategories,
  addons,
  orders,
  orderlines,
  tables,
}: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateOrderStatus = async (
    itemId: string,
    evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">
  ) => {
    dispatch(
      updateOrderlineStatus({ itemId, status: evt.target.value as OrderStatus })
    );
  };

  const renderOrderStatus = async (
    orderId: number,
    evt: SelectChangeEvent<"true" | "false">
  ) => {
    const value = evt.target.value === "true" ? true : false;
    await fetch(`${config.apiBaseUrl}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, value }),
    });
    dispatch(updateOrderStatus({ orderId, status: value }));
  };

  const getOrderlinesByOrderId = orderlines
    .filter((item) => item.orderId === orders.id)
    .map((item) => item.itemId);

  const renderMenusAddonsFromOrder = () => {
    const uniqueOrderlines: string[] = [];
    getOrderlinesByOrderId.forEach((item) => {
      const hasAdded = uniqueOrderlines.find((i) => i === item);
      if (!hasAdded) {
        uniqueOrderlines.push(item);
      }
    });

    const orderlineMenus = uniqueOrderlines.map((itemId) => {
      const orderlineAddonIds = orderlines
        .filter((i) => i.itemId === itemId)
        .map((item) => item.addonId);
      //addon
      const orderlineAddons = addons.filter((item) =>
        orderlineAddonIds.includes(item.id)
      );

      //menu
      const orderlineMenuIds = orderlines.find(
        (item) => item.itemId === itemId
      )?.menuId;

      const orderlineMenu = menus.find((item) => item.id === orderlineMenuIds);

      // status
      const status = orderlines.find((item) => item.itemId === itemId)?.status;

      // quantity
      const quantity = orderlines.find(
        (item) => item.itemId === itemId
      )?.quantity;

      //  find respective addons' addonCategories
      const addonsWithCategories: { [key: number]: Addons[] } = {};
      orderlineAddons.forEach((item) => {
        const addonCategory = addonCategories.find(
          (i) => i.id === item.addonCategoryId
        ) as AddonCategories;
        if (!addonsWithCategories[addonCategory.id]) {
          addonsWithCategories[addonCategory.id] = [item];
        } else {
          addonsWithCategories[addonCategory.id] = [
            ...addonsWithCategories[addonCategory.id],
            item,
          ];
        }
      });

      return {
        menu: orderlineMenu,
        addonsWithCategories,
        status,
        quantity,
        itemId,
      };
    });

    return (
      <div className="flex flex-row flex-wrap">
        {orderlineMenus.map((item) => (
          <div key={item.itemId} className="my-3 mr-3 ">
            <Paper elevation={4} sx={{ p: 2, width: 250, height: 350 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <Typography>{item.menu?.name}</Typography>
                    <div className="bg-blue-300 rounded-full w-10 h-10 flex justify-center items-center">
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                  <Divider variant={"middle"} sx={{ my: 2 }} />
                  {Object.keys(item.addonsWithCategories) && (
                    <Box
                      sx={{
                        overflowY: "scroll",
                        maxHeight: 200,
                      }}
                    >
                      {Object.keys(item.addonsWithCategories).map(
                        (addonCategoryId) => {
                          const addonCategory = addonCategories.find(
                            (i) => i.id === Number(addonCategoryId)
                          ) as AddonCategories;

                          const addon = item.addonsWithCategories[
                            Number(addonCategoryId)
                          ] as Addons[];

                          return (
                            <div key={addonCategoryId}>
                              <Typography
                                variant="h6"
                                sx={{ fontStyle: "italic" }}
                              >
                                {addonCategory?.name}
                              </Typography>
                              {addon.map((addon) => (
                                <p key={addon.id}>{addon.name}</p>
                              ))}
                            </div>
                          );
                        }
                      )}
                    </Box>
                  )}
                </div>
                <div className="self-center mt-4">
                  <Box>
                    <FormControl>
                      <InputLabel>status</InputLabel>
                      <Select
                        // disabled={orders.isPaid === true}
                        label="status"
                        value={item.status}
                        onChange={(evt) =>
                          handleUpdateOrderStatus(item.itemId, evt)
                        }
                      >
                        <MenuItem value={OrderStatus.PENDING}>
                          {OrderStatus.PENDING}
                        </MenuItem>
                        <MenuItem value={OrderStatus.PREPARING}>
                          {OrderStatus.PREPARING}
                        </MenuItem>
                        <MenuItem value={OrderStatus.COMPLETE}>
                          {OrderStatus.COMPLETE}
                        </MenuItem>
                        <MenuItem value={OrderStatus.REJECTED}>
                          {OrderStatus.REJECTED}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Box>
            </Paper>
          </div>
        ))}
      </div>
    );
  };

  const getMenuCount = (orderId: number) => {
    const respectiveOrderlinesMenu = orderlines
      .filter((item) => item.orderId === orderId)
      .map((item) => item.menuId) as number[];
    const uniqueMenuId = [] as number[];
    respectiveOrderlinesMenu.forEach((menuId) => {
      const hasAdded = uniqueMenuId.find((item) => item === menuId);
      if (!hasAdded) return uniqueMenuId.push(menuId);
    });
    return uniqueMenuId.length;
  };
  const tableName = tables.find((item) => item.id === orders.tableId);
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{orders.id}</TableCell>
        <TableCell align="center">{tableName?.name}</TableCell>
        <TableCell align="center">{getMenuCount(orders.id)}</TableCell>
        <TableCell align="center">{orders.price}</TableCell>
        <TableCell align="center">
          <FormControl sx={{ width: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={orders.isPaid ? "true" : "false"}
              onChange={(evt) => {
                renderOrderStatus(orders.id, evt);
              }}
            >
              <MenuItem value="true">Paid</MenuItem>
              <MenuItem value="false">Not Paid</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>{renderMenusAddonsFromOrder()}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const TableMui = (props: Orders[]) => {
  const {
    isLoading,
    menus,
    addonCategories,
    addons,
    orders,
    orderlines,
    tables,
  } = useAppSelector(appData);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {data.map((item) => (
              <TableCell key={item} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((item) => (
            <Row
              key={item.id}
              menus={menus}
              addonCategories={addonCategories}
              addons={addons}
              orders={item}
              orderlines={orderlines}
              tables={tables}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMui;
