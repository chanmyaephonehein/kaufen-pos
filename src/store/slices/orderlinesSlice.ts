import { config } from "@/config";
import { Orderlines } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderlines[];
  error: Error | null;
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchOrderlines = createAsyncThunk(
  "menusMenuCategoriesLocations/fetchMenusMenuCategoriesLocations",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations`
    );
    const menusMenuCategoriesLocations = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setOrderlines(menusMenuCategoriesLocations));
  }
);
export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<Orderlines[]>) => {
      state.items = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setOrderlines, setIsLoading } = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
