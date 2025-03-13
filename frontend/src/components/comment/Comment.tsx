import React from 'react';

export interface CommentProps {
	comment: {
		id: number;
		content: string;
		createdAt: string;
		pageId: string;
		parentId: number | null;
		user: {
			id: number;
			name: string;
			email: string;
		};
	};
	isSelected?: boolean; // highlight the currently selected comment
	isParentComment?: boolean; // indicates this comment is a parent in the chain
}

const CommentItem: React.FC<CommentProps> = ({
	comment,
	isSelected,
	isParentComment,
}) => {
	return (
		<div className={`${isSelected ? 'font-semibold bg-blue-50' : ''}`}>
			<div className="flex items-start gap-3">
				{/* Wrap the avatar in a 'relative' container 
            so we can absolutely position the vertical line below it */}
				<div className="relative w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
					{isParentComment && (
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-400 mt-[2px]" />
					)}
				</div>

				{/* The main comment content */}
				<div className="flex-1">
					<div className="flex justify-between items-center">
						<span className="text-gray-900">
							{comment.user?.name}
						</span>
						<span className="text-gray-500 text-sm">
							{new Date(comment.createdAt).toLocaleDateString()}
						</span>
					</div>
					<p className="text-gray-800">{comment.content}</p>

					{/* Hide "Reply" button if it's the selected comment */}
					{!isSelected && (
						<button className="text-blue-500 text-sm mt-2 hover:underline">
							Reply
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
