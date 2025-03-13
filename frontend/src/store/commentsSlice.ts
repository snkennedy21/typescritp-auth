import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
	isCommentsPanelOpen: boolean;
	selectedCommentId: number | null;
}

const initialState: CommentsState = {
	isCommentsPanelOpen: false,
	selectedCommentId: null,
};

export const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState,
	reducers: {
		toggleCommentsPanel: (state) => {
			state.isCommentsPanelOpen = !state.isCommentsPanelOpen;
			// optionally clear selectedCommentId here
			// state.selectedCommentId = null;
		},
		setSelectedCommentId: (state, action: PayloadAction<number | null>) => {
			state.selectedCommentId = action.payload;
		},
	},
});

export const { toggleCommentsPanel, setSelectedCommentId } =
	commentsSlice.actions;
export default commentsSlice.reducer;
