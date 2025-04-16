import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReviews, registerReview } from "./reviewApi";

const initialState = {
  reviews: [],
  getReviewsStatus: "idle",
  registerReviewStatus: "idle",
  successMsg: null,
  errors: null,
  rating:1,
  hover:1,
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

    updateRating:(state,action)=>{
        state.rating=action.payload
    },
    resetRating:(state)=>{
        state.rating=1
    },

    updateHover:(state,action)=>{
        state.hover=action.payload;
    },

    resetHover:(state)=>{
        state.hover=0;
    }

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
        state.successMsg="Review Added"
        state.errors = null;
        
      })
      .addCase(registerReviewThunk.rejected, (state, action) => {
        state.registerReviewStatus = "failed";
          state.errors = action.error.message;
        state.successMsg = null;
    
      }).addCase(getReviewsThunk.pending,(state)=>{
        state.getReviewsStatus = "loading";
        state.successMsg = null;
        state.errors = null;
      state.reviews=[]
      }).addCase(getReviewsThunk.fulfilled,(state,action)=>{

        state.getReviewsStatus = "succeed";
        state.successMsg="Reviews fetched Successfully"
        state.errors = null;
        state.reviews=action.payload.reviews;

      }).addCase(getReviewsThunk.rejected,(state,action)=>{
        state.getReviewsStatus = "failed";
        state.errors = action.error.message;
      state.successMsg = null;
      state.reviews=[];

      })
  },
});

export const {
  resetGetReviewStatus,
  resetRegisterReviewStatus,
  clearReviewErrors,
  clearReviewSuccessMsg,
  updateHover,
  updateRating,
  resetHover,
  resetRating,
} = reviewSlice.actions;

export const reviewSelectors = {
  selectReviewRegisterStatus: (state) => state.reviewSlice.registerReviewStatus,
  selectGetReviewStatus: (state) => state.reviewSlice.getReviewsStatus,
  selectReviews: (state) => state.reviewSlice.reviews,
  selectReviewsErrors: (state) => state.reviewSlice.errors,
  selectReviewSuccessMsg: (state) => state.reviewSlice.successMsg,
  selectRating:(state)=>state.reviewSlice.rating,
  selectHover:(state)=>state.reviewSlice.hover,
};

export default reviewSlice.reducer;
