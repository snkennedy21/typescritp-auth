import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	useGetTopLevelCommentsQuery,
	useGetCommentChainQuery,
} from '../../store/mainApi';
import { setSelectedCommentId } from '../../store/commentsSlice';
import CommentItem from '../comment/Comment';
import CommentInput from '../commentInput/CommentInput';
import {
	setCommentText,
	setTextAreaExpanded,
	toggleCommentsPanel,
} from '../../store/commentsSlice';
import { IoMdArrowBack } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const CommentsPanel: React.FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { isCommentsPanelOpen, selectedCommentId } = useSelector(
		(state: any) => state.commentsSlice,
	);

	const {
		data: topLevelComments,
		isLoading: topLevelLoading,
		isError: topLevelError,
	} = useGetTopLevelCommentsQuery(location.pathname, {
		skip: selectedCommentId !== null,
	});

	const {
		data: chainData,
		isLoading: chainLoading,
		isError: chainError,
	} = useGetCommentChainQuery(selectedCommentId as number, {
		skip: selectedCommentId === null,
	});

	const handleCommentClick = (commentId: number) => {
		dispatch(setTextAreaExpanded(false));
		dispatch(setCommentText(''));
		dispatch(setSelectedCommentId(commentId));
	};

	const handleBackToTopLevel = () => {
		dispatch(setTextAreaExpanded(false));
		dispatch(setCommentText(''));
		dispatch(setSelectedCommentId(null));
	};

	const handleCloseCommentsPanel = () => {
		dispatch(toggleCommentsPanel());
	};

	const renderTopLevelComments = () => {
		if (topLevelLoading) return <p>Loading comments...</p>;
		if (topLevelError) return <p>Error loading top-level comments.</p>;
		if (!topLevelComments || topLevelComments.length === 0)
			return <p>No comments yet.</p>;

		return topLevelComments.map((comment) => (
			<div
				key={comment.id}
				onClick={() => handleCommentClick(comment.id)}
				className="cursor-pointer"
			>
				<CommentItem comment={comment} />
			</div>
		));
	};

	const renderCommentChain = () => {
		if (chainLoading) return <p>Loading chain...</p>;
		if (chainError) return <p>Error loading comment chain.</p>;
		if (!chainData) return null;

		return (
			<>
				{chainData.chain.map((c) => {
					const isSelected = c.id === selectedCommentId;
					const isParentComment = !isSelected;

					return (
						<div
							key={c.id}
							className={
								isSelected ? 'cursor-default' : 'cursor-pointer'
							}
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

				<CommentInput />

				<h3 className="text-xl mb-2">Replies</h3>
				{chainData.replies.length > 0 ? (
					chainData.replies.map((reply) => (
						<div
							key={reply.id}
							onClick={() => handleCommentClick(reply.id)}
							className="cursor-pointer"
						>
							<CommentItem comment={reply} />
						</div>
					))
				) : (
					<p>No replies yet.</p>
				)}
			</>
		);
	};

	return (
		<div
			className={`fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-lg border-l transition-transform duration-300 z-10 ${
				isCommentsPanelOpen ? 'translate-x-0' : 'translate-x-full'
			} flex flex-col`}
		>
			<div className="flex-1 overflow-y-auto p-4 min-h-0">
				{selectedCommentId !== null && (
					<IoMdArrowBack
						onClick={handleBackToTopLevel}
						className="mt-4 h-5 w-5 cursor-pointer hover:text-blue-500"
					/>
				)}
				<IoClose onClick={handleCloseCommentsPanel} />
				{selectedCommentId === null && <CommentInput />}
				{selectedCommentId === null
					? renderTopLevelComments()
					: renderCommentChain()}
			</div>
		</div>
	);
};

export default CommentsPanel;
