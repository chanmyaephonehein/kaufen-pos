import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useEffect, useState } from "react";
import { getSelectedLocationId } from "@/utils/client";
import {
  AddonCategories,
  Addons,
  Menus,
  OrderStatus,
  Orderlines,
  Orders,
  Tables,
} from "@prisma/client";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  fetchOrderlines,
  updateOrderlineStatus,
} from "@/store/slices/orderlinesSlice";

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

  const menuCount = [] as Orderlines[];
  orderlines.forEach((item) => {
    const hasAdded = menuCount.find((i) => i.menuId === item.menuId);
    if (!hasAdded) menuCount.push(item);
  });

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
        <TableCell align="center">{menuCount.length}</TableCell>
        <TableCell align="center">{orders.price}</TableCell>
        <TableCell align="center">
          {orders.isPaid ? "Already Paid" : "Not Paid"}
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

const data = ["Order Id", "Table ID", "No. of Menu", "Total Price", "Is Paid"];
const Orders = () => {
  const {
    isLoading,
    menus,
    addonCategories,
    addons,
    orders,
    orderlines,
    tables,
  } = useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;
  const currentLocationOrders = orders.filter(
    (item: any) => item.locationId === Number(selectedLocationId)
  ) as Orders[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchOrderlines(""));
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="col-span-5">
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
            {currentLocationOrders.map((item) => (
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
    </div>
  );
};

export default Orders;
