import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCartItems,
  deleteCartItem,
  addCartItem,
  updateCartItem,
} from "./cartApi";

const initialState = {
  items: [],
  deleteCartStatus: "idle",
  updateCartStatus: "idle",
  getCartStatus: "idle",
  addCartStatus: "idle",
  successMessage: null,
  errors: null,
};

export const getCartItemsThunk = createAsyncThunk("/cart/items", async (id) => {
  const res = await getCartItems(id);
  return res;
});

export const deleteCartItemThunk = createAsyncThunk(
  "/cart/delete",
  async (id) => {
    const res = await deleteCartItem(id);
    return res;
  }
);

export const updateCartItemThunk = createAsyncThunk(
  "/cart/update",
  async (data) => {
    const res = await updateCartItem(data);
    return res;
  }
);

export const addCartItemThunk = createAsyncThunk("/cart/add", async (data) => {
  const res = await addCartItem(data);
  return res;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetDeleteCartStatus: (state) => {
      state.deleteCartStatus = "idle";
    },
    resetUpdateCartStatus: (state) => {
      state.updateCartStatus = "idle";
    },
    resetGetCartStatus: (state) => {
      state.getCartStatus = "idle";
    },

    resetAddCartStatus: (state) => {
      state.addCartStatus = "idle";
    },

    resetCartSuccessMsg: (state) => {
      state.successMessage = null;
    },

    resetCartErrors: (state) => {
      state.errors = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsThunk.pending, (state) => {
        state.getCartStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.getCartStatus = "succeed";
        state.items = action.payload;
        state.errors = null;
        state.successMessage = "Fetch cart Successfully";
      })
      .addCase(getCartItemsThunk.rejected, (state, action) => {
        state.getCartStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      })
      .addCase(deleteCartItemThunk.pending, (state) => {
        state.deleteCartStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        state.deleteCartStatus = "succeed";
        state.errors = null;
        state.successMessage = "Item deleted";
        state.items = state.items.filter((item) => {
          return item._id != action.payload.deletedCartItem._id;
        });
      })
      .addCase(deleteCartItemThunk.rejected, (state, action) => {
        state.deleteCartStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      })
      .addCase(updateCartItemThunk.pending, (state) => {
        state.updateCartStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.updateCartStatus = "succeed";
        state.errors = null;
        state.successMessage = "Item updated";

        state.items = state.items.map((item) => {
          return item._id === action.payload._id ? action.payload : item;
        });
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.updateCartStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      })
      .addCase(addCartItemThunk.pending, (state) => {
        state.addCartStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      })
      .addCase(addCartItemThunk.fulfilled, (state, action) => {
        state.addCartStatus = "succeed";
        state.errors = null;
        state.successMessage = "Item added to cart";

        if (action.payload.message ==="added") {
          state.items.push(action.payload.cartItem);
        } else {
          state.items = state.items.map((item) => {
            return item._id === action.payload.cartItem._id
              ? action.payload.cartItem
              : item;
          });
        }
      })
      .addCase(addCartItemThunk.rejected, (state, action) => {
        state.addCartStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      });
  },
});

export const {
  resetAddCartStatus,
  resetGetCartStatus,
  resetUpdateCartStatus,
  resetDeleteCartStatus,
  resetCartErrors,
  resetCartSuccessMsg,
} = cartSlice.actions;

export const cartSelectors = {
  selectCartDeleteStatus: (state) => state.cartSlice.deleteCartStatus,
  selectCartUpdateStatus: (state) => state.cartSlice.updateCartStatus,
  selectCartGetStatus: (state) => state.cartSlice.getCartStatus,
  selectCartAddStatus: (state) => state.cartSlice.addCartStatus,
  selectCartSuccessMsg: (state) => state.cartSlice.successMessage,
  selectCartErrors: (state) => state.cartSlice.errors,
  selectCartItems: (state) => state.cartSlice.items,
};

export default cartSlice.reducer;
