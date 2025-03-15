import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
	isCommentsPanelOpen: boolean;
	selectedCommentId: number | null;
	isTextAreaExpanded: boolean;
	commentText: string;
}

const initialState: CommentsState = {
	isCommentsPanelOpen: false,
	selectedCommentId: null,
	isTextAreaExpanded: false,
	commentText: '',
};

export const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState,
	reducers: {
		toggleCommentsPanel: (state) => {
			state.isCommentsPanelOpen = !state.isCommentsPanelOpen;
		},
		setSelectedCommentId: (state, action: PayloadAction<number | null>) => {
			state.selectedCommentId = action.payload;
		},
		setTextAreaExpanded: (state, action: PayloadAction<boolean>) => {
			state.isTextAreaExpanded = action.payload;
		},
		setCommentText: (state, action: PayloadAction<string>) => {
			state.commentText = action.payload;
		},
	},
});

export const {
	toggleCommentsPanel,
	setSelectedCommentId,
	setTextAreaExpanded,
	setCommentText,
} = commentsSlice.actions;
export default commentsSlice.reducer;
