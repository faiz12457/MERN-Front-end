import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

const initialState = {
  createOrderStatus: "idle",
  createOrderId: null,
  successMsg: null,
  errors: null,
};

export const createOrderThunk = createAsyncThunk(
  "/order/create",
  async (data) => {
    const res = await createOrder(data);
    return res;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetSuccessMsg: (state) => {
      state.successMsg = null;
    },

    resetCreateOrderStatus: (state) => {
      state.createOrderStatus = "idle";
    },

    resetOrderErrors: (state) => {
      state.errors = null;
    },

    resetOrderId: (state) => {
      state.createOrderId = null;
    },
  },

  extraReducers: (bulider) => {
    bulider
      .addCase(createOrderThunk.pending, (state) => {
        state.createOrderStatus = "loading";
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createOrderStatus = "succeed";
        state.errors = null;
        state.createOrderId = action.payload.orderId;
        state.successMsg = "Order Created";
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createOrderStatus = "failed";
        (state.successMsg = null),
          (state.createOrderId = null),
          (state.errors = action.error.message);
      });
  },
});

export const {
  resetCreateOrderStatus,
  resetOrderErrors,
  resetOrderId,
  resetSuccessMsg,
} = orderSlice.actions;

export const orderSelectors = {
  selectOrderId: (state) => state.orderSlice.createOrderId,
  selectOrderSuccessMsg: (state) => state.orderSlice.successMsg,
  selectOrderErrors: (state) => state.orderSlice.errors,
  selectCreateOrderStatus: (state) => state.orderSlice.createOrderStatus,
};

export default orderSlice.reducer;
