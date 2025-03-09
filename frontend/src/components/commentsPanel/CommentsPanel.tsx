import { useSelector, useDispatch } from 'react-redux';
import { toggleCommentsPanel } from '../../store/commentsSlice';

const CommentsPanel = () => {
	const { isCommentsPanelOpen } = useSelector((state) => state.commentsSlice);
	const dispatch = useDispatch();

	const handleCloseComments = () => {
		dispatch(toggleCommentsPanel());
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

				{/* Placeholder for Comments Content */}
				<div className="p-4">
					<p className="text-gray-500">
						No comments yet. Start a discussion!
					</p>
				</div>
			</div>
		</>
	);
};

export default CommentsPanel;
