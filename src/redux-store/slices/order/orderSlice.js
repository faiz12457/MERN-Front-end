import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getUserOrder } from "./orderApi";

const initialState = {
  createOrderStatus: "idle",
  createOrderId: null,
  successMsg: null,
  errors: null,
  userOrders: [],
  userOrdersStatus: "idle",
};

export const createOrderThunk = createAsyncThunk(
  "/order/create",
  async (data) => {
    const res = await createOrder(data);
    return res;
  }
);

export const getUserOrderThunk = createAsyncThunk("/userOrder", async () => {
  const res = await getUserOrder();
  return res;
});

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

    resetUserOrdersStatus: (state) => {
      state.userOrdersStatus = "idle";
    },

    resetUserOrders: (state) => {
      state.userOrders = [];
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
        state.successMsg = null;
        state.createOrderId = null;
        state.errors = action.error.message;
      })
      .addCase(getUserOrderThunk.pending, (state) => {
        state.userOrdersStatus = "loading";
      })
      .addCase(getUserOrderThunk.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.errors = null;
        state.userOrdersStatus = "succeed";
        state.successMsg = "Order fetch successfully";
      })
      .addCase(getUserOrderThunk.rejected, (state, action) => {
        state.userOrdersStatus = "failed";
        state.userOrders = [];
        state.errors = action.error.message;
        state.successMsg = null;
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
  selectUserOrdersStatus: (state) => state.orderSlice.userOrdersStatus,
  selectUserOrders: (state) => state.orderSlice.userOrders,
};

export default orderSlice.reducer;
