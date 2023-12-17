import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
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
import { Fragment, useState } from "react";
import { getSelectedLocationId } from "@/utils/client";
import {
  AddonCategories,
  Addons,
  Menus,
  Orderlines,
  Orders,
  Tables,
} from "@prisma/client";

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
  const getOrderlinesByOrderId = orderlines.filter(
    (item) => item.orderId === orders.id
  ) as Orderlines[];

  const uniqueOrderlines = [] as Orderlines[];
  getOrderlinesByOrderId.forEach((item) => {
    const hasAdded = uniqueOrderlines.find((i) => i.itemId === item.itemId);
    if (!hasAdded) {
      uniqueOrderlines.push(item);
    }
  });

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
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
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
    (item) => item.locationId === Number(selectedLocationId)
  ) as Orders[];

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
