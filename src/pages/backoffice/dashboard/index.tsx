import React, { ReactNode, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import {
  dataStatistics,
  getSelectedLocationId,
  mostOrderedAnalysis,
} from "@/utils/client";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Chart from "@/components/Chart";
import RangeCalendar from "@/components/RangeCalendar";

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

interface Payload {
  revenue: number;
  dishes: number;
  orders: number;
}

const Dashboard = () => {
  const currentLocationId = getSelectedLocationId();
  const { orders, orderlines, menus } = useAppSelector(appData);
  const [mostOrderedDate, setMostOrderedDate] = useState<string>("1");
  const [status, setStatus] = useState<string>("1");
  const [payload, setPayload] = useState<Payload>({
    revenue: 0,
    dishes: 0,
    orders: 0,
  });
  const [payloadOrders, setPayloadOrders] = useState<MostOrdered[]>([]);
  const dataDashboard: DataDashboard[] = [
    {
      id: 1,
      icon: <DashboardIcon />,
      percent: "+32.40%",
      amount: `$ ${payload.revenue}`,
      title: "Total Revenue",
    },
    {
      id: 2,
      icon: <DashboardIcon />,
      percent: "-12.40%",
      amount: `${payload.dishes}`,
      title: "Total Dish Ordered",
    },
    {
      id: 3,
      icon: <DashboardIcon />,
      percent: "+2.40%",
      amount: `${payload.orders}`,
      title: "Total Customer",
    },
  ];

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Data Statistics",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Revenue",
      },
    },
    series: [
      {
        name: "Example Series",
        data: [
          0.23, 0.12, 0.31, 0.41, 0.68, 0.58, 0.76, 0.78, 0.89, 1.44, 0.99, 1.2,
        ],
      },
      {
        name: "Example Series",
        data: [
          0.03, 0.12, 0.09, 0.34, 0.28, 0.21, 0.34, 1.09, 0.69, 0.76, 0.89,
          1.01,
        ],
      },
    ],
  };

  const handleChange = (evt: SelectChangeEvent) => {
    setMostOrderedDate(evt.target.value as string);
  };

  const handleChangeRevenue = (evt: SelectChangeEvent) => {
    setStatus(evt.target.value as string);
    const output = dataStatistics(
      status,
      orders,
      orderlines,
      Number(currentLocationId)
    ) as Payload;
    setPayload({
      revenue: output.revenue,
      dishes: output.dishes,
      orders: output.orders,
    });
  };

  useEffect(() => {
    const output = dataStatistics(
      status,
      orders,
      orderlines,
      Number(currentLocationId)
    ) as Payload;
    setPayload({
      revenue: output.revenue,
      dishes: output.dishes,
      orders: output.orders,
    });
  }, [status]);

  useEffect(() => {
    const outputOrder = mostOrderedAnalysis(
      "1",
      orders,
      orderlines,
      menus,
      Number(currentLocationId)
    ) as MostOrdered[];
    setPayloadOrders(outputOrder);
  }, []);
  return (
    <div className="grid grib-rows-3  grid-cols-5 gap-4">
      <div className="m-1 col-span-3 row-span-1">
        <div className="flex justify-end mb-3">
          <FormControl fullWidth size="small" sx={{ maxWidth: 120 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChangeRevenue}
            >
              <MenuItem value="1">Today</MenuItem>
              <MenuItem value="2">Week</MenuItem>
              <MenuItem value="3">Month</MenuItem>
              <MenuItem value="4">Year</MenuItem>
            </Select>
          </FormControl>
        </div>
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
      <div className="col-span-2 flex flex-col gap-3 row-span-3">
        <div className="h-96 border-solid border-gray-500 rounded-lg px-3">
          <div className="flex flex-row justify-between items-center">
            <p className="flex text-lg">Most Ordered</p>
            <FormControl fullWidth size="small" sx={{ maxWidth: 120 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mostOrderedDate}
                onChange={handleChange}
              >
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={2}>Yesterday</MenuItem>
              </Select>
            </FormControl>
          </div>{" "}
          <div>
            {payloadOrders.map((item) => (
              <div key={item.menuId}>
                <p>{item.menu}</p>
                <p>{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-64 border-solid border-gray-500 rounded-lg px-4">
          <div className="flex flex-row justify-between items-center">
            <p className="flex text-lg">Most Type of Order</p>
            <FormControl fullWidth size="small" sx={{ maxWidth: 120 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mostOrderedDate}
                onChange={handleChange}
              >
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={2}>Yesterday</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="flex col-span-3 justify-center">
        <RangeCalendar />
      </div>
      <div className="col-span-3 row-span-2">
        <Chart options={options} />
      </div>
      <div className="col-span-3 row-span-2">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
