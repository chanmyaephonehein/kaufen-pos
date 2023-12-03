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
