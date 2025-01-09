import { config } from "@/config";
import { Menus } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export interface MostOrderedMenu {
  menuId: number;
  name: string;
  quantity: number;
}

interface DataAnalysis {
  locationId: number;
  status: number;
  customerCount: number;
  totalDishes: number;
  mostOrderedMenu: MostOrderedMenu[];
  revenue: string;
  profits: string;
}

interface InitialState {
  isLoading: boolean;
  data: DataAnalysis;
  error: Error | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: {
    locationId: 0,
    status: 0,
    customerCount: 0,
    totalDishes: 0,
    mostOrderedMenu: [],
    revenue: "",
    profits: "",
  },
  error: null,
};

export const fetchDataStatistics1 = createAsyncThunk(
  "dataStatistics1/dataStatistics1",
  async (
    { locationId, date }: { locationId: number; date: Dayjs },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics?locationId=${locationId}&status=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date.toDate() }),
      }
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics2 = createAsyncThunk(
  "dataStatistics2/dataStatistics2",
  async (
    { locationId, date }: { locationId: number; date: Dayjs },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics?locationId=${locationId}&status=2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date.toDate() }),
      }
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics3 = createAsyncThunk(
  "dataStatistics3/dataStatistics3",
  async (
    { locationId, date }: { locationId: number; date: Dayjs },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics?locationId=${locationId}&status=3`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date.toDate() }),
      }
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics4 = createAsyncThunk(
  "dataStatistics4/dataStatistics4",
  async (
    { locationId, date }: { locationId: number; date: Dayjs },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setIsLoading(true));
    // Calculate start and end dates of the week
    const startOfWeek = date.startOf("week").toDate(); // First day of the week
    const endOfWeek = date.endOf("week").toDate(); // Last day of the week

    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics?locationId=${locationId}&status=4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startOfWeek, endOfWeek }),
      }
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics5 = createAsyncThunk(
  "dataStatistics/dataStatistics",
  async (locationId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics?locationId=${locationId}&status=5`
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

const dataStatisticsSlice = createSlice({
  name: "dataStatistics",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDataStatistics: (state, action: PayloadAction<DataAnalysis>) => {
      // const isExist = state.data.find((item) => {
      //   item.status === action.payload.status &&
      //     item.locationId === action.payload.locationId;
      // });
      // state.data.map((item) => {
      //   if (isExist) return;
      //   else return item;
      // });
      // state.data.push(action.payload);
      state.data = action.payload;
    },
  },
});

export const { setIsLoading, setDataStatistics } = dataStatisticsSlice.actions;

export default dataStatisticsSlice.reducer;
