import { config } from "@/config";
import { MenusAddonCategories as MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchMenusAddonCategories = createAsyncThunk(
  "menusAddonCategories/fetchMenusAddonCategories",
  async (menuIds: number[], thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/menusAddonCategories}`);
    const menusAddonCategories = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
  }
);

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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setMenusAddonCategories, setIsLoading } =
  menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
