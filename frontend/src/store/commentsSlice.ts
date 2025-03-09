import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isCommentsPanelOpen: false,
};

export const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState,
	reducers: {
		toggleCommentsPanel: (state) => {
			state.isCommentsPanelOpen = !state.isCommentsPanelOpen;
		},
	},
});

export const { toggleCommentsPanel } = commentsSlice.actions;
export default commentsSlice.reducer;
