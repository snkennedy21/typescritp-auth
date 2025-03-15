import React from 'react';

export interface CommentProps {
	comment: {
		id: number;
		content: string;
		createdAt: string;
		pageId: string;
		parentId: number | null;
		_count?: {
			// `_count` is optional
			replies: number;
		};
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
	console.log('COMMENT ITEM', comment);

	// Ensure `replies` is always a number
	const replyCount = comment._count?.replies ?? 0;

	return (
		<div
			className={`${isSelected ? 'font-semibold' : 'hover:bg-gray-100'} py-4 px-2`}
		>
			<div className="flex items-start gap-3">
				{/* Profile picture container */}
				<div className="relative w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
					{isParentComment && (
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-400 mt-[4px]" />
					)}
				</div>

				{/* Comment content */}
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

					{/* Always show the number of replies */}
					<div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
						{replyCount} {replyCount === 1 ? 'reply' : 'replies'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
