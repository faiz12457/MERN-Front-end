import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getAllProducts,
  getSingleProduct,
  restoreProduct,
  updateProduct,
} from "./productapi";
import { UpdateProductSchema } from "../../../yupSchema/updateProductSchema";

const initialState = {
  products: [],
  singleProduct: null,
  status: "idle",
  singleProductStatus: "idle",
  error: null,
  successMessage: null,
  totalResults: 0,
  createProductStatus: "idle",
  createProductError: null,
  adminProducts: [],
  adminProductsStatus: "idle",
  adminProductsError: null,
  adminTotalResults: 0,
  updateProductStatus: "idle",
};

export const fetchAllProducts = createAsyncThunk("/products", async (data) => {
  const products = await getAllProducts(data);
  return products;
});

export const fetchSingleProduct = createAsyncThunk(
  "/product-detail",
  async (id) => {
    const singleProduct = await getSingleProduct(id);
    return singleProduct;
  }
);

export const createProductThunk = createAsyncThunk(
  "/product/create",
  async (formData) => {
    const res = await createProduct(formData);
    return res;
  }
);

export const getAdminProductThunk = createAsyncThunk(
  "/products/admin",
  async (data) => {
    const res = await getAdminProducts(data);
    return res;
  }
);

export const restoreProductThunk = createAsyncThunk(
  "/product/restore",
  async (id) => {
    const res = await restoreProduct(id);
    return res;
  }
);

export const softDeleteThunk = createAsyncThunk(
  "/product/softDelete",
  async (id) => {
    const res = await deleteProduct(id);
    return res;
  }
);

export const updateProductThunk = createAsyncThunk(
  "/product/update",
  async (data) => {
    const res = await updateProduct(data);
    return res;
  }
);

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
    resetSingleProductStatus: (state) => {
      state.singleProductStatus = "idle";
    },

    resetSingleProduct: (state) => {
      state.singleProduct = null;
    },
    resetCreateProductStatus: (state) => {
      state.createProductStatus = "idle";
    },
    resetCreateProductError: (state) => {
      state.createProductError = null;
    },
    resetAdminProductStatus: (state) => {
      state.adminProductsStatus = "idle";
    },
    resetAdminProductError: (state) => {
      state.adminProductsError = null;
    },
    resetUpdateProductStatus: (state) => {
      state.updateProductStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeed";
        state.products = action.payload.data;
        state.totalResults = action.payload.totalResults;
        state.successMessage = "Products fetched successfully!";

        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.successMessage = null;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductStatus = "loading";
        state.successMessage = null;
        state.error = null;
        state.singleProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = "Succeed";
        state.successMessage = "Product Fetch Successfully";
        state.error = null;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductStatus = "failed";
        state.error = action.error.message;
        state.successMessage = null;
        state.singleProduct = null;
      })
      .addCase(createProductThunk.pending, (state) => {
        state.createProductError = null;
        state.createProductStatus = "pending";
      })
      .addCase(createProductThunk.fulfilled, (state) => {
        state.createProductStatus = "fullfilled";
        state.createProductError = null;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.createProductStatus = "rejected";
        state.createProductError = action.error.message;
      })
      .addCase(getAdminProductThunk.pending, (state) => {
        state.adminProductsStatus = "pending";
        state.adminProductsError = null;
      })
      .addCase(getAdminProductThunk.fulfilled, (state, action) => {
        state.adminProductsStatus = "fullfilled";
        state.adminProductsError = null;
        state.adminProducts = action.payload.data;
        state.adminTotalResults = action.payload.totalResults;
      })
      .addCase(getAdminProductThunk.rejected, (state, action) => {
        state.adminProductsStatus = "rejected";
        state.adminProductsError = action.error.message;
      })
      .addCase(softDeleteThunk.fulfilled, (state, action) => {
        state.adminProducts = state.adminProducts.map((product) => {
          return product._id === action.payload.id
            ? { ...product, isDeleted: true }
            : product;
        });
      })
      .addCase(restoreProductThunk.fulfilled, (state, action) => {
        state.adminProducts = state.adminProducts.map((product) => {
          return product._id === action.payload.id
            ? { ...product, isDeleted: false }
            : product;
        });
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.updateProductStatus = "pending";
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.updateProductStatus = "fullfilled";
        state.singleProduct = action.payload.updatedProduct;
      })
      .addCase(updateProductThunk.rejected, (state) => {
        state.updateProductStatus = "rejected";
      });
  },
});

export const {
  clearProductErrors,
  clearProductSuccessMessage,
  resetProductStatus,
  resetSingleProductStatus,
  resetCreateProductError,
  resetCreateProductStatus,
  resetAdminProductStatus,
  resetAdminProductError,
  resetSingleProduct,
  resetUpdateProductStatus,
} = productSlice.actions;

export const productSelectors = {
  selectProductsStatus: (state) => state.productSlice.status,
  selectProductsSuccessMessage: (state) => state.productSlice.successMessage,
  selectProducts: (state) => state.productSlice.products,
  selectProductsErrors: (state) => state.productSlice.error,
  selectSingleProduct: (state) => state.productSlice.singleProduct,
  selectSingleProductStatus: (state) => state.productSlice.singleProductStatus,
  selectTotalResults: (state) => state.productSlice.totalResults,
  selectCreateProductStatus: (state) => state.productSlice.createProductStatus,
  selectCreateProductError: (state) => state.productSlice.clearProductErrors,
  selectAdminProductStatus: (state) => state.productSlice.adminProductsStatus,
  selectAdminProductError: (state) => state.productSlice.adminProductsError,
  selectAdminProducts: (state) => state.productSlice.adminProducts,
  selectAdminProductResults: (state) => state.productSlice.adminTotalResults,
  selectUpdateProductStatus: (state) => state.productSlice.updateProductStatus,
};

export default productSlice.reducer;
