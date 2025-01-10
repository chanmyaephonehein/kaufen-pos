import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { dataStatistic, getSelectedLocationId } from "@/utils/client";
import {
  fetchDataStatistics1,
  fetchDataStatistics2,
  fetchDataStatistics3,
  fetchDataStatistics4,
  fetchDataStatistics5,
} from "@/store/slices/dataStatisticsSlice";
import { useAppDispatch } from "@/store/hooks";

dayjs.extend(weekOfYear);

const Calendar = ({ calendarStatus }: { calendarStatus: number }) => {
  const currentLocationId = Number(getSelectedLocationId());
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const [selectedYear, setSelectedYear] = useState<Dayjs>(dayjs());
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [selectedWeek, setSelectedWeek] = useState<Dayjs>(dayjs());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchDataStatistics5({
        locationId: currentLocationId,
        startDay: startDate as Dayjs,
        endDay: endDate as Dayjs,
      })
    );
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
            }}
            sx={{ width: "200px" }}
          />
          <span>To</span>
          <DatePicker
            label="End Date"
            maxDate={dayjs()}
            value={endDate}
            onChange={(end) => {
              setEndDate(end as Dayjs);
            }}
            sx={{ width: "200px" }}
          />
        </LocalizationProvider>
      )}
      {calendarStatus === 2 && ( // date month
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Month"
            value={selectedMonth}
            onChange={(newDate) => {
              setSelectedMonth(newDate as Dayjs);
              dispatch(
                fetchDataStatistics2({
                  locationId: currentLocationId,
                  date: newDate as Dayjs,
                })
              );
            }}
            views={["year", "month"]} // Enables only year and month selection
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      )}
      {calendarStatus === 3 && ( // date year
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Year"
            value={selectedYear}
            onChange={(newDate) => {
              setSelectedYear(newDate as Dayjs);
              dispatch(
                fetchDataStatistics3({
                  locationId: currentLocationId,
                  date: newDate as Dayjs,
                })
              );
            }}
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
            onChange={(newDate) => {
              setSelectedDay(newDate as Dayjs);
              dispatch(
                fetchDataStatistics1({
                  locationId: currentLocationId,
                  date: newDate as Dayjs,
                })
              );
            }}
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
              dispatch(
                fetchDataStatistics4({
                  locationId: currentLocationId,
                  date: newDate as Dayjs,
                })
              );
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
