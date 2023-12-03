import { Locations as Location } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationState {
  isLoading: boolean;
  items: Location[];
  error: Error | null;
}

const initialState: LocationState = {
  isLoading: false,
  items: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.items.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setLocations, addLocation, updateLocation, deleteLocation } =
  locationsSlice.actions;

export default locationsSlice.reducer;
