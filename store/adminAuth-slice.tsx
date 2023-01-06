import { createSlice } from "@reduxjs/toolkit";

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: { islogin: false, adminId: "", companyId: "" },
  reducers: {
    setAdmin(state, action) {
      state.adminId = action.payload;
    },
    setCompany(state, action) {
      state.companyId = action.payload;
    },
  },
});

export const { setAdmin ,setCompany } = adminAuthSlice.actions;
