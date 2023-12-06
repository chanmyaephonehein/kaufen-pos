import { useAppDispatch } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReady) {
      dispatch(fetchAppData({ locationId: query.locationId as string }));
    }
  }, [query, isReady, dispatch, fetchAppData]);

  return (
    <div>
      <div>Lee lh </div>
    </div>
  );
};

export default OrderLayout;
