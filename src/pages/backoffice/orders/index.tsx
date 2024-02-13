import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useEffect, useState } from "react";
import { getSelectedLocationId } from "@/utils/client";
import { Orders } from "@prisma/client";
import { Tab, Tabs } from "@mui/material";
import { fetchOrderlines } from "@/store/slices/orderlinesSlice";
import { fetchOrders } from "@/store/slices/ordersSlice";
import TableMui from "@/components/TableMui";

const Orders = () => {
  const { isLoading, orders } = useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;
  const currentLocationOrders = orders.filter(
    (item: any) => item.locationId === Number(selectedLocationId)
  ) as Orders[];

  const newOrder = currentLocationOrders.filter(
    (item) => item.isPaid === false
  ) as Orders[];

  const oldOrder = currentLocationOrders.filter(
    (item) => item.isPaid === true
  ) as Orders[];

  const dispatch = useAppDispatch();
  const [orderOption, setOrderOption] = useState<number>(1);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
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

  if (isLoading) return <Loading />;

  return (
    <div className="col-span-5">
      <div className="flex flex-row justify-center mb-3">
        <Tabs value={value} onChange={(e, v) => setValue(v)}>
          <Tab
            value={1}
            label="New Orders"
            key={1}
            onClick={() => {
              setOrderOption(1);
            }}
          />
          <Tab
            value={2}
            label="Old Orders"
            key={2}
            onClick={() => {
              setOrderOption(2);
            }}
          />
        </Tabs>
      </div>
      {orderOption === 1 && TableMui(newOrder)}
      {orderOption === 2 && TableMui(oldOrder)}
    </div>
  );
};

export default Orders;
