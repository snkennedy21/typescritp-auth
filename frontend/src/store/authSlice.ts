import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuthenticated = true;
    },
    unauthenticateUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;
