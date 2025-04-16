import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getSingleProduct } from "./productapi";

const initialState = {
  products: [],
  singleProduct:null,
  status: "idle",
  singleProductStatus:"idle",
  error: null,
  successMessage: null,
};

export const fetchAllProducts = createAsyncThunk("/products", async () => {
  const products = await getAllProducts();
  return products;
});

export const fetchSingleProduct=createAsyncThunk("/product-detail",async(id)=>{
  
          const singleProduct=await getSingleProduct(id);
          return singleProduct;
})

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
    resetSingleProductStatus:(state)=>{
      state.singleProductStatus="idle";
    }
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
      }).addCase(fetchSingleProduct.pending,(state)=>{
        state.singleProductStatus="loading";
        state.successMessage=null;
        state.error=null;
        state.singleProduct=null;
      }).addCase(fetchSingleProduct.fulfilled,(state,action)=>{
        state.singleProductStatus="Succeed";
        state.successMessage="Product Fetch Successfully";
        state.error=null;
        state.singleProduct=action.payload;

      }).addCase(fetchSingleProduct.rejected,(state,action)=>{
        state.singleProductStatus= "failed";
        state.error = action.error.message;
        state.successMessage = null;
        state.singleProduct=null;
      });
  },
});

export const {
  clearProductErrors,
  clearProductSuccessMessage,
  resetProductStatus,
  resetSingleProductStatus,
} = productSlice.actions;

export const productSelectors = {
  selectProductsStatus: (state) => state.productSlice.status,
  selectProductsSuccessMessage: (state) => state.productSlice.successMessage,
  selectProducts: (state) => state.productSlice.products,
  selectProductsErrors: (state) => state.productSlice.error,
  selectSingleProduct:(state)=>state.productSlice.singleProduct,
  selectSingleProductStatus:(state)=>state.productSlice.singleProductStatus,
};

export default productSlice.reducer;
