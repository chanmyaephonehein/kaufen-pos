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
    updateMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setMenus, addMenu, updateMenu, deleteMenu } = MenusSlice.actions;

export default MenusSlice.reducer;
