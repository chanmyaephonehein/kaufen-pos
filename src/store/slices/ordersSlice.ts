import { config } from "@/config";
import { Orders as Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  isLoading: boolean;
  items: Order[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/orders`);
    const orders = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setOrders(orders));
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items = [...state.items, action.payload];
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: number; status: boolean }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.orderId) {
          return { ...item, isPaid: action.payload.status };
        } else {
          return item;
        }
      });
    },
  },
});

export const { setIsLoading, setOrders, addOrder, updateOrderStatus } =
  ordersSlice.actions;

export default ordersSlice.reducer;
