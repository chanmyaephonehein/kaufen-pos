import TableMui from "@/components/TableMui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getMenuCount, getSelectedLocationId } from "@/utils/client";
import {
  AddonCategories,
  Addons,
  Menus,
  Orders,
  OrderStatus,
} from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { config } from "@/config";
import { updateOrderStatus } from "@/store/slices/ordersSlice";
import { updateOrderlineStatus } from "@/store/slices/orderlinesSlice";

const OrderTable = () => {
  const { orders, tables, orderlines, addons, menus, addonCategories } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const router = useRouter();
  const query = router.query;
  const tableId = Number(query.id);
  const tableName = tables.find((item) => item.id === tableId)?.name;

  const order = orders.find(
    (item) =>
      item.tableId === tableId &&
      item.locationId === Number(selectedLocationId) &&
      item.isPaid === false &&
      item.isArchived === false
  ) as Orders;

  const respectiveOrderlines = orderlines.filter(
    (item) => item.orderId === Number(order?.id)
  );

  const getOrderlinesItemIdByOrderId = respectiveOrderlines.map(
    (item) => item.itemId
  );

  const dispatch = useAppDispatch();

  const handleUpdateOrderlineStatus = async (
    itemId: string,
    evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">
  ) => {
    dispatch(
      updateOrderlineStatus({ itemId, status: evt.target.value as OrderStatus })
    );
  };

  const header = () => {
    const renderOrderStatus = async (
      orderId: number,
      evt: SelectChangeEvent<"true" | "false">
    ) => {
      const value = evt.target.value === "true" ? true : false;
      await fetch(`${config.apiBaseUrl}/orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, value }),
      });
      dispatch(updateOrderStatus({ orderId, status: value }));
      router.push({ pathname: "/backoffice/orders" });
    };
    return (
      <div className="flex flex-col justify-center">
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => router.push({ pathname: "/backoffice/orders" })}
        >
          <UndoIcon style={{ color: "gray", fontSize: "30px" }} />
          <span className="text-gray-500 hover:text-gray-900 text-xl  ">
            Back
          </span>
        </div>
        <div className="flex flex-row justify-between text-lg">
          <div className="flex flex-col justify-center items-center">
            <span className="font-sans">Table</span>
            <span className="text-gray-600">{tableName}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-sans">OrderID</span>
            <span className="text-gray-600">
              {" "}
              {order?.id ? order.id : "Unconcern Table"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-sans">Menu Count</span>
            <span className="text-gray-600">
              {getMenuCount(Number(order?.id), respectiveOrderlines)}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-sans">Total Price</span>
            <span className="text-gray-600">{order?.price}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-sans">Status</span>
            <FormControl sx={{ width: 120 }}>
              <Select
                value={order?.isPaid ? "true" : "false"}
                onChange={(evt) => {
                  renderOrderStatus(Number(order.id), evt);
                }}
              >
                {order?.isPaid === false && (
                  <MenuItem value="true">Paid</MenuItem>
                )}
                <MenuItem value="false">Not Paid</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    );
  };

  const body = () => {
    const renderMenusAddonsFromOrder = () => {
      const uniqueOrderlines: string[] = [];
      getOrderlinesItemIdByOrderId.forEach((item) => {
        const hasAdded = uniqueOrderlines.find((i) => i === item);
        if (!hasAdded) {
          uniqueOrderlines.push(item);
        }
      });

      const orderlineMenus = uniqueOrderlines.map((itemId) => {
        const orderlineAddonIds = orderlines
          .filter((i) => i.itemId === itemId)
          .map((i) => i.addonId);

        //addon
        const orderlineAddons = addons.filter((item) =>
          orderlineAddonIds.includes(item.id)
        ) as Addons[];

        const orderlineMenuId = respectiveOrderlines.find(
          (item) => item.itemId === itemId
        )?.menuId;

        //menu
        const orderlineMenu = menus.find((item) => item.id === orderlineMenuId);

        //status
        const status = respectiveOrderlines.find(
          (item) => item.itemId === itemId
        )?.status;

        //quantity
        const quantity = orderlines.find(
          (item) => item.itemId === itemId
        )?.quantity;

        // find respective addons' addonCategories
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
                          label="status"
                          value={item.status}
                          onChange={(evt) =>
                            handleUpdateOrderlineStatus(item.itemId, evt)
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
    return (
      <div>
        <div>{renderMenusAddonsFromOrder()}</div>
      </div>
    );
  };

  return (
    <div className="m-5">
      {header()}
      {body()}
    </div>
  );
};

export default OrderTable;
