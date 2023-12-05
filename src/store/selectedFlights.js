import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const selectedFlightsSlice = createSlice({
  name: "selectedFlights",
  initialState: [],
  reducers: {
    addFlight: (state, action) => {
      state.push({ ...action.payload, id: nanoid() });
    },
    removeFlight: (state, action) => {
      const index = state.findIndex((flight) => flight.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
    clearFlights: (state, action) => {
      return [];
    },
  },
});

export const { addFlight, removeFlight, clearFlights } =
  selectedFlightsSlice.actions;

export default selectedFlightsSlice.reducer;
