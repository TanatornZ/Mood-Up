import { createSlice } from "@reduxjs/toolkit";

export interface AuthRedux {
  userId: string;
  picture: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { userId: "", pictureUrl: "" },
  reducers: {
    setLineUser(state, action) {
      state.userId = action.payload.userId;
      state.pictureUrl = action.payload.pictureUrl;
    },
  },
});



export const { setLineUser } = authSlice.actions;
