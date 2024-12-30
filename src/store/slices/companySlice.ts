import { Companies as Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

interface CompanyState {
  isLoading: boolean;
  items: Company | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: false,
  items: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.items = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
