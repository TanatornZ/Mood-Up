import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    userId: "",
    pictureUrl: "",
    companyId: ''
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.pictureUrl = action.payload.pictureUrl;
      state.companyId = action.payload.companyId
    },
  },
});

export const { setUser } = userSlice.actions;
