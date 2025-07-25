import { configureStore, createSlice } from "@reduxjs/toolkit";
import productSlice from "./slices/product/productSlice.js";
import userSlice from "./slices/user/userSlice.js";
import addressSlice from "./slices/address/addressSlice.js";
import reviewSlice from "./slices/review/reviewSlice.js";
import cartSlice from "./slices/cart/cartSlice.js";
import orderSlice from "./slices/order/orderSlice.js";
import authSlice from "./slices/auth/authSlice.js"

export const store = configureStore({
  reducer: {
    productSlice,
    userSlice,
    addressSlice,
    reviewSlice,
    cartSlice,
    orderSlice,
    authSlice,
  },
});
