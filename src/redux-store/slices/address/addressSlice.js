import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAddress,
  getUserAddress,
  registerUserAddress,
  updateUserAddress,
} from "./addressApi";

const initialState = {
  status: "idle",
  addressAddStatus: "idle",
  addressDeleteStatus: "idle",
  addressUpdateStatus: "idle",
  address: null,
  errors: null,
  successMessage: null,
};

export const fetchUserAddress = createAsyncThunk("/address", async () => {
  const res = await getUserAddress();
  return res;
});

export const updateUserAddressThunk = createAsyncThunk(
  "/address/update",
  async (data) => {
    const res = await updateUserAddress(data);
    return res;
  }
);

export const deleteUserAddressThunk = createAsyncThunk(
  "address/delete",
  async () => {
    const res = await deleteUserAddress();
    return res;
  }
);

export const registerUserAddressThunk = createAsyncThunk(
  "/address/register",
  async (data) => {
    const res = await registerUserAddress(data);
    return res;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddressStatus: (state) => {
      state.status = "idle";
    },
    resetAddressErrors: (state) => {
      state.errors = null;
    },

    resetAddressSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetAddressAddStatus: (state) => {
      state.addressAddStatus = "idle";
    },
    resetAddressDeleteStatus: (state) => {
      state.addressDeleteStatus = "idle";
    },
    resetAddressUpdateStatus: (state) => {
      state.addressUpdateStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = "succeed";
        state.address = action.payload;
        state.successMessage = "Welcome";
        state.errors = null;
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
        state.address = null;
      })
      .addCase(updateUserAddressThunk.pending, (state) => {
        state.addressUpdateStatus = "loading";
      })
      .addCase(updateUserAddressThunk.fulfilled, (state, action) => {
        (state.successMessage = "Address updated successfully"),
          (state.errors = null);
        state.address = action.payload;
        state.addressUpdateStatus = "succeed";
      })
      .addCase(updateUserAddressThunk.rejected, (state, action) => {
        state.addressUpdateStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      })
      .addCase(registerUserAddressThunk.pending, (state) => {
        state.addressAddStatus = "loading";
      })
      .addCase(registerUserAddressThunk.fulfilled, (state, action) => {
        state.successMessage = "Address added successfully";
        state.errors = null;
        state.address = action.payload;
        state.addressAddStatus = "succeed";
      })
      .addCase(registerUserAddressThunk.rejected, (state, action) => {
        state.addressAddStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      })
      .addCase(deleteUserAddressThunk.pending, (state) => {
        state.addressDeleteStatus = "loading";
      })
      .addCase(deleteUserAddressThunk.fulfilled, (state) => {
        state.successMessage = "Address deleted successfully";
        state.errors = null;
        state.address = null;
        state.addressDeleteStatus = "succeed";
      })
      .addCase(deleteUserAddressThunk.rejected, (state, action) => {
        state.addressDeleteStatus = "failed";
        state.errors = action.error.message;
        state.successMessage = null;
      });
  },
});

export const addressSelectors = {
  selectUserAddress: (state) => state.addressSlice.address,
  selectAddressStatus: (state) => state.addressSlice.status,
  selectAddressErrors: (state) => state.addressSlice.errors,
  selectAddressSuccessMessage: (state) => state.addressSlice.successMessage,
  selectAddressAddStatus: (state) => state.addressSlice.addressAddStatus,
  selectAddressDeleteStatus: (state) => state.addressSlice.addressDeleteStatus,
  selectAddressUpdateStatus: (state) => state.addressSlice.addressUpdateStatus,
};

export const {
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressStatus,
  resetAddressUpdateStatus,
  resetAddressErrors,
  resetAddressSuccessMessage,
} = addressSlice.actions;

export default addressSlice.reducer;
