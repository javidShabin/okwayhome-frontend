import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/features/userSlice'
import cartReducer from '../redux/features/cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
