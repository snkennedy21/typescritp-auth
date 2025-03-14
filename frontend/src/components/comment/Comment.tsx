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
		<div
			className={`${isSelected ? 'font-semibold' : 'hover:bg-gray-100'} py-4 px-2 border-b-2 border-solid border-gray-200`}
		>
			<div className="flex items-start gap-3">
				{/* Wrap the profile pictures in a 'relative' container 
            so we can absolutely position the vertical line below it */}
				<div className="relative w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
					{isParentComment && (
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-400 mt-[4px]" />
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
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
