import React, { ReactNode, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

interface DataDashboard {
  id: number;
  icon: ReactNode;
  percent: string;
  amount: string;
  title: string;
}

interface MostOrdered {
  id: number;
  menu: string;
  totalAmount: number;
}

const dataDashboard: DataDashboard[] = [
  {
    id: 1,
    icon: <DashboardIcon />,
    percent: "+32.40%",
    amount: "$5,060.00",
    title: "Total Revenue",
  },
  {
    id: 2,
    icon: <DashboardIcon />,
    percent: "-12.40%",
    amount: "1,204",
    title: "Total Dish Ordered",
  },
  {
    id: 3,
    icon: <DashboardIcon />,
    percent: "+2.40",
    amount: "534",
    title: "Total Customer",
  },
];
const Dashboard = () => {
  const [mostOrderedDate, setMostOrderedDate] = useState<string>("1");
  const handleChange = (evt: SelectChangeEvent) => {
    setMostOrderedDate(evt.target.value as string);
  };
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="m-1 col-span-3">
        <div className="flex">
          <h3>Date: Thursday 19 Dec, 2024</h3>{" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
        <div className="flex justify-between">
          {dataDashboard.map((item) => (
            <div
              key={item.id}
              className="w-44 h-28 border-solid border-gray-500 p-4 rounded-lg flex flex-col"
            >
              <div className="flex items-center mb-4 gap-2">
                <span>{item.icon}</span>
                <span>{item.percent}</span>
              </div>
              <span className="text-3xl mb-3">{item.amount}</span>
              <span className="text-gray-500">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-3 ">
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
          </div>
        </div>
        <div className="h-64 border-solid border-gray-500 rounded-lg px-4">
          {" "}
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
    </div>
  );
};

export default Dashboard;
