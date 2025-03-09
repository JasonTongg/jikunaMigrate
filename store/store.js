import { configureStore } from "@reduxjs/toolkit";
import data from "./data";
import { encryptMiddleware } from './encryptMiddleware.js';

let store = configureStore({
  reducer: {
    data,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(encryptMiddleware),
});

export default store;
