import { Tables as Table } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TablesState {
  isLoading: boolean;
  items: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setTables, addTable } = tablesSlice.actions;

export default tablesSlice.reducer;
