import { Addons as Addon, Menus as Menu } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  menu: Menu;
  addon: Addon;
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
  reducers: {},
});

export default cartSlice.reducer;
