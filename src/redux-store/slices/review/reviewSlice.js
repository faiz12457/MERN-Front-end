import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteReview,
  getReviews,
  registerReview,
  updateReview,
} from "./reviewApi";


const initialState = {
  reviews: [],
  
  deletedReview: null,
  getReviewsStatus: "idle",
  registerReviewStatus: "idle",
  deleteReviewStatus: "idle",
  updateReviewStatus: "idle",
  successMsg: null,
  errors: null,
  rating:2,
};

export const registerReviewThunk = createAsyncThunk(
  "/review/register",
  async (data) => {
    const res = await registerReview(data);
    return res;
  }
);

export const getReviewsThunk = createAsyncThunk(
  "/review/product",
  async (id) => {
    const res = await getReviews(id);
    return res;
  }
);

export const deleteReviewThunk = createAsyncThunk(
  "/review/delete",
  async (id) => {
    const res = await deleteReview(id);
    return res;
  }
);

export const updateReviewThunk = createAsyncThunk(
  "/update",
  async (data) => {
    const res = await updateReview(data);
    return res;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    

    clearReviewSuccessMsg: (state) => {
      state.successMsg = null;
    },

    clearReviewErrors: (state) => {
      state.errors = null;
    },
    resetRegisterReviewStatus: (state) => {
      state.registerReviewStatus = "idle";
    },
    resetGetReviewStatus: (state) => {
      state.getReviewsStatus = "idle";
    },

    resetDeleteReviewStatus: (state) => {
      state.deleteReviewStatus = "idle";
    },
    resetUpdateReviewStatus: (state) => {
      state.updateReviewStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerReviewThunk.pending, (state) => {
        state.registerReviewStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      })
      .addCase(registerReviewThunk.fulfilled, (state, action) => {
        state.registerReviewStatus = "succeed";
        state.successMsg = "Review Added";
        state.errors = null;
        state.reviews.push(action.payload.review);
      })
      .addCase(registerReviewThunk.rejected, (state, action) => {
        state.registerReviewStatus = "failed";
        state.errors = action.error.message;
        state.successMsg = null;
      })
      .addCase(getReviewsThunk.pending, (state) => {
        state.getReviewsStatus = "loading";
        state.successMsg = null;
        state.errors = null;
        state.reviews = [];
      })
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.getReviewsStatus = "succeed";
        state.successMsg = "Reviews fetched Successfully";
        state.errors = null;
        state.reviews = action.payload.reviews;
      })
      .addCase(getReviewsThunk.rejected, (state, action) => {
        state.getReviewsStatus = "failed";
        state.errors = action.error.message;
        state.successMsg = null;
        state.reviews = [];
      })
      .addCase(deleteReviewThunk.pending, (state) => {
        state.deleteReviewStatus = "loading";
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.deleteReviewStatus = "succeed";
        state.deletedReview = action.payload;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload._id
        );
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.deleteReviewStatus = "failed";
        state.errors = action.error.message;
      })
      .addCase(updateReviewThunk.pending, (state) => {
        state.updateReviewStatus = "loading";
      })
      .addCase(updateReviewThunk.fulfilled, (state, action) => {
        state.updateReviewStatus = "succeed";
        state.reviews=state.reviews.map((review)=>review._id===action.payload._id?action.payload:review);
      })
      .addCase(updateReviewThunk.rejected, (state,action) => {
        state.updateReviewStatus = "failed";
        state.errors = action.error.message;
      });
  },
});

export const {
  resetUpdateReviewStatus,
  resetGetReviewStatus,
  resetRegisterReviewStatus,
  clearReviewErrors,
  clearReviewSuccessMsg,
  resetDeleteReviewStatus,
} = reviewSlice.actions;

export const reviewSelectors = {
  selectReviewRegisterStatus: (state) => state.reviewSlice.registerReviewStatus,
  selectGetReviewStatus: (state) => state.reviewSlice.getReviewsStatus,
  selectReviews: (state) => state.reviewSlice.reviews,
  selectReviewsErrors: (state) => state.reviewSlice.errors,
  selectReviewSuccessMsg: (state) => state.reviewSlice.successMsg,
  selectRating: (state) => state.reviewSlice.rating,
  selectHover: (state) => state.reviewSlice.hover,
  selectDeleteReviewStatus: (state) => state.reviewSlice.deleteReviewStatus,
  selectUpdateReviewStatus: (state) => state.reviewSlice.updateReviewStatus,
};

export default reviewSlice.reducer;
