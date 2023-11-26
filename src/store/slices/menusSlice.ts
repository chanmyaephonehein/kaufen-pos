import { Menus as Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenusState {
  isLoading: boolean;
  items: Menu[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: false,
  items: [],
  error: null,
};

export const MenusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setMenus, addMenu } = MenusSlice.actions;

export default MenusSlice.reducer;
