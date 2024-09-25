import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        increment: (state, action) => {
            (state.totalQuantity += 1), (state.items = action.payload)
        },
        decrement: (state) => {
            (state.totalQuantity -= 1), (state.items = [])
        }
      },
})
export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;