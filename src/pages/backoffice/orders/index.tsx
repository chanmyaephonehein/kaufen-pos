import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useEffect, useState } from "react";
import { getSelectedLocationId } from "@/utils/client";
import { Tab, Tabs } from "@mui/material";
import { fetchOrderlines } from "@/store/slices/orderlinesSlice";
import { fetchOrders } from "@/store/slices/ordersSlice";
import TableMui from "@/components/TableMui";
import { Orders as Order } from "@prisma/client";
import TableOrderStatus from "@/components/TableOrderStatus";

const Orders = () => {
  const { isLoading, orders, tables } = useAppSelector(appData);
  const [orderOption, setOrderOption] = useState<number>(1);
  const [value, setValue] = useState<number>(1);
  const selectedLocationId = getSelectedLocationId() as string;
  const currentLocationOrders = orders.filter(
    (item: any) => item.locationId === Number(selectedLocationId)
  ) as Order[];

  const newOrder = currentLocationOrders.filter(
    (item) => item.isPaid === false
  ) as Order[];

  const oldOrder = currentLocationOrders.filter(
    (item) => item.isPaid === true
  ) as Order[];

  const dispatch = useAppDispatch();

  const handleTab = (props: number) => {
    setOrderOption(props);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchOrderlines(""));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchOrders(""));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="col-span-5">
      <div className="flex flex-row justify-center mb-3">
        <Tabs value={value} onChange={(e, v) => setValue(v)}>
          <Tab
            value={1}
            label="By Tables"
            key={1}
            onClick={() => {
              handleTab(1);
            }}
          />
          <Tab
            value={2}
            label="New Orders"
            key={2}
            onClick={() => {
              handleTab(2);
            }}
          />
          <Tab
            value={3}
            label="Old Orders"
            key={3}
            onClick={() => {
              handleTab(3);
            }}
          />
        </Tabs>
      </div>
      <div>
        {orderOption === 1 && TableOrderStatus()}
        {orderOption === 2 && TableMui(newOrder)}
        {orderOption === 3 && TableMui(oldOrder)}
      </div>
    </div>
  );
};

export default Orders;
