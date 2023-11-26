import { AddonCategories as AddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonCategoriesState {
  isLoading: boolean;
  items: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setAddonCategories, addAddonCategory } =
  addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
