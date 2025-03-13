import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	useGetTopLevelCommentsQuery,
	useGetCommentChainQuery,
} from '../../store/mainApi';
import { setSelectedCommentId } from '../../store/commentsSlice';
import CommentItem from '../comment/Comment';

const CommentsPanel = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { isCommentsPanelOpen, selectedCommentId } = useSelector(
		(state) => state.commentsSlice,
	);

	// 1) Top-level comments when no selection
	const { data: topLevelComments, isLoading: topLevelLoading } =
		useGetTopLevelCommentsQuery(location.pathname, {
			skip: selectedCommentId !== null,
		});

	// 2) If a comment is selected, fetch its chain + replies
	const { data: chainData, isLoading: chainLoading } =
		useGetCommentChainQuery(selectedCommentId as number, {
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
			<div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
				{selectedCommentId === null ? (
					// ---------------------------------------
					// CASE 1: No comment selected => top-level
					// ---------------------------------------
					topLevelLoading ? (
						<p>Loading comments...</p>
					) : topLevelComments?.length ? (
						topLevelComments.map((comment) => (
							<div
								key={comment.id}
								onClick={() => handleCommentClick(comment.id)}
							>
								<CommentItem comment={comment} />
							</div>
						))
					) : (
						<p>No comments yet.</p>
					)
				) : // ---------------------------------------
				// CASE 2: Selected comment => show chain
				// ---------------------------------------
				chainLoading ? (
					<p>Loading chain...</p>
				) : chainData ? (
					<>
						{/* 
                1) Stack each comment in the chain top-to-bottom.
                   The last item in chain is the currently selected comment.
              */}
						<div className="mb-4">
							{chainData.chain.map((c) => (
								<div
									key={c.id}
									className="mb-4 border-b border-gray-300 pb-2 cursor-pointer"
									onClick={() => handleCommentClick(c.id)}
								>
									<CommentItem comment={c} />
								</div>
							))}
						</div>

						{/* 2) Now show direct replies to the selected comment */}
						<h3 className="text-xl mb-2">Replies</h3>
						{chainData.replies.length > 0 ? (
							chainData.replies.map((reply) => (
								<div
									key={reply.id}
									onClick={() => handleCommentClick(reply.id)}
									className="border-b border-gray-300 pb-2 mb-4"
								>
									<CommentItem comment={reply} />
								</div>
							))
						) : (
							<p>No replies yet.</p>
						)}

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
