import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});
