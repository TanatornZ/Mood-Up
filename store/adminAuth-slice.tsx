import { createSlice } from "@reduxjs/toolkit";

export interface AuthAdmin {
  isLogin: boolean;
  adminId: string;
  companyId: string;
}

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: { adminId: "", companyId: "", companyName: "" },
  reducers: {
    setAdmin(state, action) {
      state.adminId = action.payload.admin;
      state.companyId = action.payload.company;
    },
    setCompanyName(state, action) {
      state.companyName = action.payload;
    },
  },
});

export const { setAdmin, setCompanyName } = adminAuthSlice.actions;
