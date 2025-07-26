import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getAllOrders,
  getUserOrder,
  updateOrderStatus,
} from "./orderApi";

const initialState = {
  createOrderStatus: "idle",
  createOrderId: null,
  successMsg: null,
  errors: null,
  userOrders: [],
  userOrdersStatus: "idle",
  orders: [],
  ordersStatus: "idle",
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

export const getAllOrderThunk = createAsyncThunk("/order/all", async () => {
  const res = await getAllOrders();
  return res;
});

export const updateOrderStatusThunk = createAsyncThunk(
  "/order/updateStatus",
  async (data) => {
    const res = await updateOrderStatus(data);
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

    resetUserOrdersStatus: (state) => {
      state.userOrdersStatus = "idle";
    },

    resetUserOrders: (state) => {
      state.userOrders = [];
    },

    resetOrdersStatus: (state) => {
      state.ordersStatus = "idle";
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
      })
      .addCase(getAllOrderThunk.pending, (state) => {
        state.ordersStatus = "pending";
      })
      .addCase(getAllOrderThunk.fulfilled, (state, action) => {
        state.ordersStatus = "fullfilled";
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrderThunk.rejected, (state) => {
        state.ordersStatus = "rejected";
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {

        state.orders = state.orders.map((order) => {
          return order._id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order;
        });
      });
  },
});

export const {
  resetCreateOrderStatus,
  resetOrderErrors,
  resetOrderId,
  resetSuccessMsg,
  resetOrdersStatus,
} = orderSlice.actions;

export const orderSelectors = {
  selectOrderId: (state) => state.orderSlice.createOrderId,
  selectOrderSuccessMsg: (state) => state.orderSlice.successMsg,
  selectOrderErrors: (state) => state.orderSlice.errors,
  selectCreateOrderStatus: (state) => state.orderSlice.createOrderStatus,
  selectUserOrdersStatus: (state) => state.orderSlice.userOrdersStatus,
  selectUserOrders: (state) => state.orderSlice.userOrders,
  selectAllOrders: (state) => state.orderSlice.orders,
  selectAllOrdersStatus: (state) => state.orderSlice.ordersStatus,
};

export default orderSlice.reducer;
