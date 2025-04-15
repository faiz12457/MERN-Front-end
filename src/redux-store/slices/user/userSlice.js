import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleUser } from "./userApi";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  successMessage: null,
};

export const fetchSingleUser = createAsyncThunk("/user", async () => {
  const singleUser = await getSingleUser();
  return singleUser;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserErrors:(state)=>{
        state.error=null
    },
    clearUserSuccessMessage:(state)=>{
        state.successMessage=null
    },
    resetUserStatus:(state)=>{
        state.status='idle'
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.status === "loading";
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.user = action.payload;
        state.successMessage = "User fetched successfully!";
        state.error = null;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.successMessage = null;
      });
  },
});


 export const  {clearUserErrors,clearUserSuccessMessage,resetUserStatus} =userSlice.actions


export const userSelectors={
    selectUser:(state)=> state.userSlice.user,
    selectUserStatus:(state)=> state.userSlice.status,
    selectUserError:(state)=> state.userSlice.error,
    selectUserSuccessMessage:(state)=> state.userSlice.successMessage,
}



export default userSlice.reducer;