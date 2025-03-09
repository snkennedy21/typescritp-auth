import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		authenticateUser: (state, actions) => {
			state.currentUser = actions.payload;
		},
		unauthenticateUser: (state) => {
			state.currentUser = null;
		},
	},
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;
