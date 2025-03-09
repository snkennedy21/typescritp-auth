import { useDispatch } from 'react-redux';
import { toggleCommentsPanel } from '../../store/commentsSlice';

const CurrentPageActions = () => {
	const dispatch = useDispatch();

	const handleOpenComments = () => {
		dispatch(toggleCommentsPanel());
	};

	return (
		<div className="w-full flex items-center justify-between p-4 border-t bg-white">
			{/* Left Side - Thumbs Up and Chat Bubble */}
			<div className="flex items-center space-x-4">
				<button className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
					👍 <span>12</span>
				</button>
				<button
					onClick={handleOpenComments}
					className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
				>
					💬 <span>5</span>
				</button>
			</div>

			{/* Right Side - Placeholder Icons */}
			<div className="flex items-center space-x-4">
				<button className="text-gray-700 hover:text-gray-900">
					🔗
				</button>
				<button className="text-gray-700 hover:text-gray-900">
					⚙
				</button>
				<button className="text-gray-700 hover:text-gray-900">
					📌
				</button>
			</div>
		</div>
	);
};

export default CurrentPageActions;
