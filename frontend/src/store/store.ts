import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [authSlice.name]: authSlice.reducer,
    // [userSlice.name]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export const authSliceActions = authSlice.actions;
// export const userSliceActions = userSlice.actions;

setupListeners(store.dispatch);
