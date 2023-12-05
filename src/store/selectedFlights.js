import { createSlice } from "@reduxjs/toolkit";

const selectedFlightsSlice = createSlice({
  name: "selectedFlights",
  initialState: [],
  reducers: {
    addFlight: (state, action) => {
      state.push(action.payload);
    },
    removeFlight: (state, action) => {
      if (action.payload !== -1) {
        state.splice(action.payload, 1);
      }
    },
  },
});

export const { addFlight, removeFlight } = selectedFlightsSlice.actions;

export default selectedFlightsSlice.reducer;
