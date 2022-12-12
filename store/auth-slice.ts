import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { islogin: true, user: "user1" },
  reducers: {
    change(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const actions = authSlice.actions;