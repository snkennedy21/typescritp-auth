import React, { useEffect, useRef, useState } from 'react';

export interface CommentProps {
	comment: {
		id: number;
		content: string;
		createdAt: string;
		pageId: string;
		parentId: number | null;
		_count?: {
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
	const commentRef = useRef<HTMLDivElement>(null);
	const [commentHeight, setCommentHeight] = useState(0);

	// Update the height of the comment dynamically
	useEffect(() => {
		if (commentRef.current) {
			setCommentHeight(commentRef.current.clientHeight);
		}
	}, [comment.content]); // Re-run effect when comment text changes

	// Ensure `replies` is always a number
	const replyCount = comment._count?.replies ?? 0;

	return (
		<div
			ref={commentRef}
			className={`${isSelected ? 'font-semibold' : 'hover:bg-gray-100'} py-4 px-2 relative`}
		>
			<div className="flex items-start gap-3">
				{/* Profile picture container */}
				<div className="relative w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
					{isParentComment && (
						<div
							className="absolute top-full left-1/2 transform -translate-x-1/2 w-px bg-gray-400 mt-[4px]"
							style={{ height: `${commentHeight - 50}px` }} // Dynamic height
						/>
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
