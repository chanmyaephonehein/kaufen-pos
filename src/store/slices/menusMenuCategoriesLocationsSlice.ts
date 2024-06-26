import { config } from "@/config";
import { MenusMenuCategoriesLocations as MenuMenuCategoryLocation } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MenusMenusCategoriesLocationsState {
  isLoading: boolean;
  items: MenuMenuCategoryLocation[];
  error: Error | null;
}

const initialState: MenusMenusCategoriesLocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchMenusMenuCategoriesLocations = createAsyncThunk(
  "menusMenuCategoriesLocations/fetchMenusMenuCategoriesLocations",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations`
    );
    const menusMenuCategoriesLocations = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
  }
);

const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenuMenuCategoryLocation[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations, setIsLoading } =
  menusMenuCategoriesLocationsSlice.actions;

export default menusMenuCategoriesLocationsSlice.reducer;
