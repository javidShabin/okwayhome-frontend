import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import cartReducer from "../redux/features/cartSlice";
import profileReducer from "../redux/features/profileSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    profile: profileReducer,
  },
});
