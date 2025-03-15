import { useSelector, useDispatch } from 'react-redux';
import { useSubmitCommentMutation } from '../../store/mainApi';
import { setCommentText, setTextAreaExpanded } from '../../store/commentsSlice';

const CommentInput = () => {
	const dispatch = useDispatch();
	const { commentText, isTextAreaExpanded, selectedCommentId } = useSelector(
		(state: any) => state.commentsSlice,
	);

	const [submitComment] = useSubmitCommentMutation();

	const handleSubmit = async () => {
		if (commentText.trim() !== '') {
			await submitComment({
				text: commentText,
				pageId: location.pathname,
				parentId: selectedCommentId,
			});
			dispatch(setCommentText(''));
			dispatch(setTextAreaExpanded(false));
		}
	};

	const handleCancel = () => {
		dispatch(setCommentText(''));
		dispatch(setTextAreaExpanded(false));
	};

	return (
		<>
			{/* Comment Input (Animated) */}
			<div className="p-4 border-b">
				<textarea
					value={commentText}
					onChange={(e) => dispatch(setCommentText(e.target.value))}
					onFocus={() => dispatch(setTextAreaExpanded(true))}
					placeholder="Share your thoughts..."
					className={`w-full p-2 border rounded-md resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						isTextAreaExpanded ? 'h-32' : 'h-11'
					}`}
				></textarea>

				{/* Buttons (Smooth Fade-In) */}
				<div
					className={`flex justify-end space-x-2 mt-2 transition-opacity duration-300 ${
						isTextAreaExpanded
							? 'opacity-100'
							: 'opacity-0 pointer-events-none'
					}`}
				>
					<button
						onClick={handleCancel}
						className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-all"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default CommentInput;
