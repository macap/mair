import { configureStore } from "@reduxjs/toolkit";
import selectedFlights from "./store/selectedFlights";

// const logger = (store) => (next) => (action) => {
//   console.log("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   return result;
// };

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      selectedFlights,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState,
  });
};

const defaultStore = setupStore();

export default defaultStore;
