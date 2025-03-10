import React from 'react';

interface CommentProps {
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
		replies?: CommentProps['comment'][]; // Recursive type for nested replies
	};
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	return (
		<div className="border-b border-gray-300 p-4 max-w-xl">
			{/* User Info */}
			<div className="flex items-start gap-3">
				<div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />{' '}
				{/* Profile Picture Placeholder */}
				<div className="flex-1">
					<div className="flex justify-between items-center">
						<span className="font-semibold text-gray-900">
							{comment.user.name}
						</span>
						<span className="text-gray-500 text-sm">
							{new Date(comment.createdAt).toLocaleDateString()}
						</span>
					</div>
					<p className="text-gray-800">{comment.content}</p>
					<button className="text-blue-500 text-sm mt-2 hover:underline">
						Reply
					</button>

					{/* Nested Replies */}
					{comment.replies && comment.replies.length > 0 && (
						<div className="mt-4 border-l-2 border-gray-300 pl-4">
							{comment.replies.map((reply) => (
								<Comment key={reply.id} comment={reply} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
