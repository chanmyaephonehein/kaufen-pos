import { config } from "@/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface MostOrderedMenu {
  menuId: number;
  name: string;
  quantity: number;
}

interface DataAnalysis {
  customerCount: number;
  totalDishes: number;
  mostOrderedMenu: MostOrderedMenu[];
  revenue: string;
  profits: string;
  locationId: number;
  status: number;
}

interface InitialState {
  isLoading: boolean;
  data: DataAnalysis[];
  error: Error | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const fetchDataStatistics1 = createAsyncThunk(
  "dataStatistics/dataStatistics",
  async (
    { locationId, date }: { locationId: number; date: Dayjs },
    thunkAPI
  ) => {
    console.log("Data Fetching is started.");
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
    console.log("Data Fetching is completed.");
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics2 = createAsyncThunk(
  "dataStatistics/dataStatistics",
  async (locationId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics/2?locationId=${locationId}&status=2`
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics3 = createAsyncThunk(
  "dataStatistics/dataStatistics",
  async (locationId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics/3?locationId=${locationId}&status=3`
    );
    const data = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setDataStatistics(data));
  }
);

export const fetchDataStatistics4 = createAsyncThunk(
  "dataStatistics/dataStatistics",
  async (locationId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/dataStatistics/4?locationId=${locationId}&status=4`
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
      `${config.apiBaseUrl}/dataStatistics/5?locationId=${locationId}&status=5`
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
      const isExist = state.data.find((item) => {
        item.status === action.payload.status &&
          item.locationId === action.payload.locationId;
      });
      state.data.map((item) => {
        if (isExist) return;
        else return item;
      });
      state.data.push(action.payload);
    },
  },
});

export const { setIsLoading, setDataStatistics } = dataStatisticsSlice.actions;

export default dataStatisticsSlice.reducer;
