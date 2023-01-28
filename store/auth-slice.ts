import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { islogin: true, line_id: "id123" },
  reducers: {
    change(state, action) {
      state.line_id = action.payload.user;
    },
  },
});

