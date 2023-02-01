import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  line_id: string;
  picture: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { line_id: "", picture: "" },
  reducers: {
    setLineUser(state, action) {
      state.line_id = action.payload.userId;
      state.picture = action.payload.pictureUrl;
    },
  },
});

export const {setLineUser} = authSlice.actions;
