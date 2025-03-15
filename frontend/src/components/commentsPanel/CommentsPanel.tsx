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
				{/* 3) Go back to top-level */}
				<button
					onClick={handleBackToTopLevel}
					className="mt-4 text-blue-500"
				>
					{`<-`}
				</button>
				{/* CASE A: No comment is selected. These Are Top Level Comment Items */}
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
								className="cursor-pointer"
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
						{/* Chain Of Parents And Selected Comment */}
						{chainData.chain.map((c, idx) => {
							const isSelected = c.id === selectedCommentId;
							const isParentComment = !isSelected;

							return (
								<div
									key={c.id}
									className={`${
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

						{/* Replies */}
						<h3 className="text-xl mb-2">Replies</h3>
						{chainData.replies.length > 0 ? (
							chainData.replies.map((reply) => (
								<div
									key={reply.id}
									onClick={() => handleCommentClick(reply.id)}
									className="cursor-pointer"
								>
									{/* Replies are neither selected nor parent => no special BG */}
									<CommentItem comment={reply} />
								</div>
							))
						) : (
							<p>No replies yet.</p>
						)}
					</>
				) : null}
			</div>
		</div>
	);
};

export default CommentsPanel;
