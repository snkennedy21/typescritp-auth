import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	useGetTopLevelCommentsQuery,
	useGetCommentChainQuery,
} from '../../store/mainApi';
import { setSelectedCommentId } from '../../store/commentsSlice';
import CommentItem from '../comment/Comment';

const CommentsPanel: React.FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { isCommentsPanelOpen, selectedCommentId } = useSelector(
		(state: any) => state.commentsSlice,
	);

	// 1) If no comment is selected, fetch top-level
	const {
		data: topLevelComments,
		isLoading: topLevelLoading,
		isError: topLevelError,
	} = useGetTopLevelCommentsQuery(location.pathname, {
		skip: selectedCommentId !== null,
	});

	// 2) If a comment is selected, fetch chain + replies
	const {
		data: chainData,
		isLoading: chainLoading,
		isError: chainError,
	} = useGetCommentChainQuery(selectedCommentId as number, {
		skip: selectedCommentId === null,
	});

	const handleCommentClick = (commentId: number) => {
		// Select that comment
		dispatch(setSelectedCommentId(commentId));
	};

	const handleBackToTopLevel = () => {
		dispatch(setSelectedCommentId(null));
	};

	return (
		<div
			className={`fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-lg border-l transition-transform duration-300 z-10 ${
				isCommentsPanelOpen ? 'translate-x-0' : 'translate-x-full'
			} flex flex-col`}
		>
			<div className="flex-1 overflow-y-auto p-4 min-h-0">
				{/* CASE A: No comment is selected => top-level */}
				{selectedCommentId === null ? (
					topLevelLoading ? (
						<p>Loading comments...</p>
					) : topLevelError ? (
						<p>Error loading top-level comments.</p>
					) : topLevelComments && topLevelComments.length > 0 ? (
						topLevelComments.map((comment) => (
							<div
								key={comment.id}
								onClick={() => handleCommentClick(comment.id)}
								className="border-b border-gray-300 pb-2 cursor-pointer"
							>
								{/* No parent vs. child distinction here—no chain selected */}
								<CommentItem comment={comment} />
							</div>
						))
					) : (
						<p>No comments yet.</p>
					)
				) : // CASE B: A comment is selected => chain + replies
				chainLoading ? (
					<p>Loading chain...</p>
				) : chainError ? (
					<p>Error loading comment chain.</p>
				) : chainData ? (
					<>
						{/* 
                1) Render the chain top-to-bottom. 
                   The last item is the selected comment.
                   Others are parents => highlight them in green
              */}
						{chainData.chain.map((c, idx) => {
							// If this comment is the selected one
							const isSelected = c.id === selectedCommentId;
							// If it's NOT selected but in the chain, it's a parent
							const isParentComment = !isSelected;

							return (
								<div
									key={c.id}
									className={`border-gray-300 ${
										isSelected
											? 'cursor-default'
											: 'cursor-pointer'
									}`}
									onClick={
										isSelected
											? undefined
											: () => handleCommentClick(c.id)
									}
								>
									<CommentItem
										comment={c}
										isSelected={isSelected}
										isParentComment={isParentComment}
									/>
								</div>
							);
						})}

						{/* 2) Now show direct replies for the selected comment */}
						<h3 className="text-xl mb-2">Replies</h3>
						{chainData.replies.length > 0 ? (
							chainData.replies.map((reply) => (
								<div
									key={reply.id}
									onClick={() => handleCommentClick(reply.id)}
									className="border-b border-gray-300 pb-2 mb-4 cursor-pointer"
								>
									{/* Replies are neither selected nor parent => no special BG */}
									<CommentItem comment={reply} />
								</div>
							))
						) : (
							<p>No replies yet.</p>
						)}

						{/* 3) Go back to top-level */}
						<button
							onClick={handleBackToTopLevel}
							className="mt-4 text-blue-500"
						>
							Back to Top-Level
						</button>
					</>
				) : null}
			</div>
		</div>
	);
};

export default CommentsPanel;
