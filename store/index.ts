import { configureStore } from "@reduxjs/toolkit";
import { adminAuthSlice } from "./adminAuth-slice";
import { authSlice } from "./auth-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    adminAuth: adminAuthSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
