import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mobileNavOpen: false,
};

export const navigationSlice = createSlice({
	name: 'navigationSlice',
	initialState: initialState,
	reducers: {
		openMobileNavigation: (state) => {
			state.mobileNavOpen = true;
		},
		closeMobileNavigation: (state) => {
			state.mobileNavOpen = false;
		},
	},
});

export const { openMobileNavigation, closeMobileNavigation } =
	navigationSlice.actions;
export default navigationSlice.reducer;
