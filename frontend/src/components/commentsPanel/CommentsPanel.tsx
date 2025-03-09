import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCommentsPanel } from '../../store/commentsSlice';

const CommentsPanel = () => {
	const { isCommentsPanelOpen } = useSelector((state) => state.commentsSlice);
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);

	const handleCloseComments = () => {
		dispatch(toggleCommentsPanel());
	};

	const handleSubmit = () => {
		if (comment.trim() !== '') {
			console.log('New Comment:', comment);
			setComment('');
			setIsExpanded(false); // Reset to initial state

			// API Call to save the comment to the database
		}
	};

	const handleCancel = () => {
		setComment('');
		setIsExpanded(false); // Shrink the textarea back
	};

	return (
		<>
			{/* Comments Panel */}
			<div
				className={`fixed top-0 right-0 h-full w-[600px] bg-white shadow-lg border-l transition-transform duration-300 z-10 ${
					isCommentsPanelOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Panel Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-lg font-semibold">Comments</h2>
					<button
						onClick={handleCloseComments}
						className="text-gray-500 hover:text-gray-700"
					>
						✖
					</button>
				</div>

				{/* Comment Input (Animated) */}
				<div className="p-4 border-b">
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						onFocus={() => setIsExpanded(true)}
						placeholder="Share your thoughts..."
						className={`w-full p-2 border rounded-md resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							isExpanded ? 'h-32' : 'h-11'
						}`}
					></textarea>

					{/* Buttons (Smooth Fade-In) */}
					<div
						className={`flex justify-end space-x-2 mt-2 transition-opacity duration-300 ${
							isExpanded
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

				{/* Comments Content */}
				<div className="p-4 flex-1 overflow-y-auto">
					<p className="text-gray-500">
						No comments yet. Start a discussion!
					</p>
				</div>
			</div>
		</>
	);
};

export default CommentsPanel;
