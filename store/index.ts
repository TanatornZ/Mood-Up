import { configureStore } from "@reduxjs/toolkit";
import { adminAuthSlice } from "./adminAuth-slice";
import { authSlice } from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    adminAuth: adminAuthSlice.reducer,
  },
});

export default store;
