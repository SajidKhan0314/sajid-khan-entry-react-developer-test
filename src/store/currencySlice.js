import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: null,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
