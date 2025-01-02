import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const RangeCalendar = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <div className="flex justify-center items-center gap-3">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <span>From</span>
        <DatePicker
          label="Start Date"
          maxDate={dayjs()}
          value={startDate}
          onChange={(start) => {
            setStartDate(start as Dayjs);
            console.log(startDate);
          }}
        />
        <span>To</span>
        <DatePicker
          label="End Date"
          maxDate={dayjs()}
          value={endDate}
          onChange={(end) => {
            setEndDate(end as Dayjs);
            console.log(endDate);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default RangeCalendar;
