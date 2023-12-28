import { config } from "@/config";
import { OrderStatus, Orderlines } from "@prisma/client";
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

interface UpdataOrderlinePayload {
  itemId: string;
  status: OrderStatus;
}

export const fetchOrderlines = createAsyncThunk(
  "orderlines/fetchOrderlines",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/orderlines`);
    const orderlines = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setOrderlines(orderlines));
  }
);

export const updateOrderlineStatus = createAsyncThunk(
  "orderlines/updateOrderlineStatus",
  async (payload: UpdataOrderlinePayload, thunkAPI) => {
    await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    thunkAPI.dispatch(updateOrderlines(payload));
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
    updateOrderlines: (
      state,
      action: PayloadAction<{ itemId: string; status: OrderStatus }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.itemId === action.payload.itemId) {
          return { ...item, status: action.payload.status };
        } else {
          return item;
        }
      });
    },
  },
});

export const { setOrderlines, setIsLoading, updateOrderlines } =
  orderlinesSlice.actions;

export default orderlinesSlice.reducer;
