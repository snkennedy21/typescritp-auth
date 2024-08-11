import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './mainApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './authSlice';
import { navigationSlice } from './navigationSlice';

export const store = configureStore({
	reducer: {
		[mainApi.reducerPath]: mainApi.reducer,
		[authSlice.name]: authSlice.reducer,
		[navigationSlice.name]: navigationSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mainApi.middleware),
});

export const authSliceActions = authSlice.actions;
export const navigationSliceActions = navigationSlice.actions;
// export const userSliceActions = userSlice.actions;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
