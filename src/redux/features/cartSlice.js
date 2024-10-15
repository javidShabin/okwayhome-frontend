import { createSlice } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.totalQuantity += 1;
      state.items = action.payload;
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
    decrement: (state) => {
      state.totalQuantity -= 1;
      state.items = [];
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
  },
});

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
