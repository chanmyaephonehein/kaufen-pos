import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const Calendar = ({ calendarStatus }: { calendarStatus: number }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedWeek, setSelectedWeek] = useState(dayjs());

  const fetchDateRange = () => {};
  useEffect(() => {
    if (startDate && endDate) {
      fetchDateRange;
    }
  }, [startDate, endDate]);
  return (
    <div className="flex justify-center items-center gap-3">
      {calendarStatus === 5 && ( // date range
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
      )}
      {calendarStatus === 3 && ( // date month
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Month"
            value={selectedMonth}
            onChange={(newDate) => setSelectedMonth(newDate as Dayjs)}
            views={["year", "month"]} // Enables only year and month selection
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      )}
      {calendarStatus === 2 && ( // date year
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Year"
            value={selectedYear}
            onChange={(newDate) => setSelectedYear(newDate as Dayjs)}
            views={["year"]} // Year selection only
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      )}
      {calendarStatus === 1 && ( // date day
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Day"
            value={selectedDay}
            onChange={(newDate) => setSelectedDay(newDate as Dayjs)}
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      )}
      {calendarStatus === 4 && ( // week selector
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Week"
            value={selectedWeek}
            onChange={(newDate) => {
              setSelectedWeek(newDate?.startOf("week") as Dayjs); // Start of the selected week
              console.log(`Selected Week: ${newDate?.week()}`);
            }}
            views={["day"]} // View days, but handle weeks programmatically
            maxDate={dayjs()}
            // renderInput={(params) => <input {...params} />}
          />
          <p>
            Selected Week: {selectedWeek.week()} (Starting:{" "}
            {selectedWeek.format("YYYY-MM-DD")})
          </p>
        </LocalizationProvider>
      )}
    </div>
  );
};

export default Calendar;
