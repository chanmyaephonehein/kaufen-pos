import { Addons as Addon, Menus as Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CartItem {
  id: string;
  menu: Menu;
  addon: Addon[];
  quantity: number;
}

export interface CartState {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}

const initialState: CartState = {
  isLoading: false,
  items: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addoToCart: (state, action: PayloadAction<CartItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addoToCart, removeFromCart, emptyCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
