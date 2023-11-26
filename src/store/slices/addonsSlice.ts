import { Addons as Addon } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface addonsState {
  isLoading: boolean;
  items: Addon[];
  error: null | Error;
}

const initialState: addonsState = {
  isLoading: true,
  items: [],
  error: null,
};

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
  },
});

export const { setAddons, addAddon } = addonsSlice.actions;

export default addonsSlice.reducer;
