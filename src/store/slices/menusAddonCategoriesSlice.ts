import { MenusAddonCategories as MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenusAddonCategoriesState {
  isLoading: boolean;
  items: MenuAddonCategory[];
  error: Error | null;
}

const initialState: MenusAddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.items = action.payload;
    },
    addMenusAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      action.payload.map((item) => state.items.push(item));
    },
  },
});

export const { setMenusAddonCategories, addMenusAddonCategories } =
  menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
