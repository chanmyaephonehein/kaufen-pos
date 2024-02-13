import { Addons as Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./menusMenuCategoriesLocationsSlice";
import { config } from "@/config";

interface addonsState {
  isLoading: boolean;
  items: Addon[];
  error: null | Error;
}

const initialState: addonsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchAddons = createAsyncThunk(
  "addons/fetchAddons",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/addonsAddonCategories`);
    const addons = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setAddons(addons));
  }
);

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.items = [...state.items, action.payload];
    },
    updateAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddons, addAddon, updateAddon, deleteAddon } =
  addonsSlice.actions;

export default addonsSlice.reducer;
