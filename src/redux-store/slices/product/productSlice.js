import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productapi";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  successMessage: null,
};

export const fetchAllProducts = createAsyncThunk("/products", async () => {
  const products = await getAllProducts();
  return products;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
    },
    clearProductSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetProductStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeed";
        state.products = action.payload;
        state.successMessage = "Products fetched successfully!";
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.successMessage = null;
      });
  },
});

export const {
  clearProductErrors,
  clearProductSuccessMessage,
  resetProductStatus,
} = productSlice.actions;

export const productSelectors = {
  selectProductsStatus: (state) => state.productSlice.status,
  selectProductsSuccessMessage: (state) => state.productSlice.successMessage,
  selectProducts: (state) => state.productSlice.products,
  selectProductsErrors: (state) => state.productSlice.error,
};

export default productSlice.reducer;
