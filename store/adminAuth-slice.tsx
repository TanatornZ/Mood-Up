import { createSlice } from "@reduxjs/toolkit";

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: { islogin: false, adminId: "", companyId: "" },
  reducers: {
    setAdmin(state, action) {
      state.adminId = action.payload.admin;
      state.companyId = action.payload.company;
    },
  },
});

export const { setAdmin  } = adminAuthSlice.actions;
