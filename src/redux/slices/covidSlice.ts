import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/types";
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
  reducers: {},
});

export default covidSlice.reducer;
