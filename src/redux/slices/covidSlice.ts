import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CovidData, RootState } from "@/types";
import { DATA } from "@/lib/data";

const initialState: RootState = {
  selectedState: {
    id: 1,
    state: "Andhra Pradesh",
    totalCases: 2200000,
    activeCases: 15000,
    recovered: 2170000,
    deaths: 30000,
  },
  covidData: DATA,
  filteredStates: [],
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    setSelectedState: (state, action: PayloadAction<CovidData>) => {
      state.selectedState = action.payload;
    },
  },
});

export const { setSelectedState } = covidSlice.actions;
export default covidSlice.reducer;
