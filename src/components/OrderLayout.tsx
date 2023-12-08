import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { selectCart } from "@/store/slices/cartSlice";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  useEffect(() => {
    if (isReady) {
      dispatch(fetchAppData({ locationId: query.locationId as string }));
    }
  }, [query, isReady, dispatch, fetchAppData]);

  return (
    <div>
      <OrderAppHeader cartCountItem={items.length} />
      <div>{children} </div>
    </div>
  );
};

export default OrderLayout;
