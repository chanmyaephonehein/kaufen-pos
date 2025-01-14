import React, { ReactNode, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import {
  dataStatistic,
  getSelectedLocationId,
  mostOrderedAnalysis,
} from "@/utils/client";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Chart from "@/components/Chart";
import Calendar from "@/components/Calendar";

interface DataDashboard {
  id: number;
  icon: ReactNode;
  percent: string;
  amount: string;
  title: string;
}

export interface MostOrdered {
  menuId: number;
  menu: string;
  quantity: number;
}

const Dashboard = () => {
  const currentLocationId = Number(getSelectedLocationId());
  const { orders, orderlines, menus, dataStatistics } = useAppSelector(appData);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const visibleMenu = dataStatistics.mostOrderedMenuByNumber.slice(
    0,
    visibleCount
  );

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 3);
  };
  const [calendarStatus, setCalendarStatus] = useState<number>(1);
  const dataDashboard: DataDashboard[] = [
    {
      id: 1,
      icon: <DashboardIcon />,
      percent: "+32.40%",
      amount: `$ ${dataStatistics.revenue}`,
      title: "Total Revenue",
    },
    {
      id: 2,
      icon: <DashboardIcon />,
      percent: "-12.40%",
      amount: `${dataStatistics.totalDishes}`,
      title: "Total Dish Ordered",
    },
    {
      id: 3,
      icon: <DashboardIcon />,
      percent: "+2.40%",
      amount: `${dataStatistics.customerCount}`,
      title: "Total Customer",
    },
  ];

  return (
    <div className="grid grib-rows-3  grid-cols-5 gap-4">
      <div className="m-1 col-span-3 row-span-1">
        <div className="flex col-span-3 justify-between items-center mb-5">
          <Calendar calendarStatus={calendarStatus} />
          <FormControl fullWidth size="small" sx={{ maxWidth: 120 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={calendarStatus}
              onChange={(evt) =>
                setCalendarStatus(Number(evt.target.value) as number)
              }
            >
              <MenuItem value={1}>By Day</MenuItem>
              <MenuItem value={2}>By Month</MenuItem>
              <MenuItem value={3}>By Year</MenuItem>
              <MenuItem value={4}>By Week</MenuItem>{" "}
              <MenuItem value={5}>Custom</MenuItem>
            </Select>
          </FormControl>
        </div>{" "}
        <div className="flex justify-between ">
          {dataDashboard.map((item) => (
            <div
              key={item.id}
              className="w-44 h-28 border-solid border-gray-500 p-4 rounded-lg flex flex-col"
            >
              <div className="flex items-center mb-4 gap-2">
                <span>{item.icon}</span>
                <span>{item.percent}</span>
              </div>
              <span className="text-2xl mb-3">{item.amount}</span>
              <span className="text-gray-500">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-3 row-span-3 sticky top-24 h-[calc(100vh-64px)]">
        <div
          className={
            visibleCount < dataStatistics.mostOrderedMenuByNumber.length
              ? "h-[400px] border-solid border-gray-500 rounded-lg px-3 py-5 flex flex-col item-between"
              : "h-[400px] border-solid border-gray-500 rounded-lg px-3  py-5"
          }
        >
          <span className="flex text-3xl font-semibold mb-4">Most Ordered</span>
          <div className="h-[300px] overflow-y-auto">
            {visibleMenu.map((item) => (
              <div key={item.menuId} className="flex mb-3">
                <div className="border-solid border-gray-600 w-20 h-20 mr-6"></div>
                <div className="flex flex-col ">
                  <span className="text-2xl">{item.name}</span>
                  <span className="text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="mt-0 w-2/3 ">
              {visibleCount < dataStatistics.mostOrderedMenuByNumber.length ? (
                <Button variant="outlined" onClick={handleLoadMore} fullWidth>
                  Load More
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setVisibleCount(3)}
                >
                  Top 3
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="h-64 border-solid border-gray-500 rounded-lg px-4">
          <p className="flex text-lg">Most Type of Order</p>
        </div>
      </div>

      <div className="col-span-3 row-span-2">
        <Chart status={calendarStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
