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
  },
});

export const { setLocations, addLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
