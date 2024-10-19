import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateCovidData, RootState } from "@/types"; // Assuming the updated types are correctly imported
import { DATA } from "@/lib/data"; // Assuming DATA is imported correctly

const initialState: RootState = {
  selectedState: DATA.states[0],
  covidData: DATA,
};

// Slice definition
const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    setSelectedState: (state, action: PayloadAction<StateCovidData>) => {
      state.selectedState = action.payload;
    },
  },
});

// Exporting actions and reducer
export const { setSelectedState } = covidSlice.actions;
export default covidSlice.reducer;
