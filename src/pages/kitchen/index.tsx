import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import dayjs from "dayjs";
import React from "react";

const Kitchen = () => {
  const { orders } = useAppSelector(appData);
  const currentLocationId = getSelectedLocationId() as string;
  const todayDate = dayjs();
  return (
    <div>
      <div className="flex justify-between items-center sticky top-0 z-10 bg-blue-300">
        <p>Kaufen</p>
        <div>Order Status</div>
        <div>Setting</div>
      </div>
      <div>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a </p>
      </div>
      <div className="sticky h-full bottom-0 bg-blue-300 z-10">Complete</div>
    </div>
  );
};

export default Kitchen;
