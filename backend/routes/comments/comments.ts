import express, { Request, Response, Router } from 'express';
import { prisma } from '../../prisma';
import { Comment } from '@prisma/client';

export const commentsRouter: Router = express.Router();

/*********************************************************************
 * * Get Comments For Page
 * @returns {Comment[]} - Array of all Comments
 ********************************************************************/
commentsRouter.get('/', async (req: Request, res: Response) => {
	try {
		const { pageId } = req.query;

		const comments = await prisma.comment.findMany({
			where: {
				pageId: String(pageId),
				parentId: null,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				_count: {
					select: {
						replies: true, // Counting replies
					},
				},
			},
		});

		res.status(200).json(comments);
	} catch (error) {
		console.error('Error fetching comments:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// GET /api/comments/:commentId/chain
commentsRouter.get('/:commentId/chain', async (req, res) => {
	try {
		const { commentId } = req.params;
		const numericId = Number(commentId);

		// 1) Fetch the selected comment with `_count.replies`
		const selectedComment = await prisma.comment.findUnique({
			where: { id: numericId },
			include: {
				user: true,
				_count: {
					select: { replies: true },
				},
			},
		});

		if (!selectedComment) {
			return res.status(404).json({ error: 'Comment not found.' });
		}

		// 2) Build the chain of ancestors, ensuring each has a `replies` count
		const chain = await buildCommentChain(selectedComment);

		// 3) Fetch direct replies of the selected comment, including `_count.replies`
		const replies = await prisma.comment.findMany({
			where: { parentId: numericId },
			include: {
				user: true,
				_count: {
					select: { replies: true },
				},
			},
		});

		// Return shape: { chain, replies }
		res.status(200).json({ chain, replies });
	} catch (error) {
		console.error('Error fetching chain:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Helper to walk up the parent chain
async function buildCommentChain(comment: Comment): Promise<Comment[]> {
	const chain: Comment[] = [];

	let currentComment = comment;

	// Walk up the parent chain, ensuring each has `_count.replies`
	while (currentComment) {
		const parent = await prisma.comment.findUnique({
			where: { id: currentComment.id },
			include: {
				user: true,
				_count: {
					select: { replies: true },
				},
			},
		});

		if (!parent) break;

		// Move `_count.replies` to `replies`
		chain.push(parent); // Type casting to allow modification

		currentComment = parent.parentId
			? await prisma.comment.findUnique({
					where: { id: parent.parentId },
				})
			: null;
	}

	// Reverse to go from top-level to selected comment
	return chain.reverse();
}

/*********************************************************************
 * * Create New Comment
 * @returns {Comment} - The newly created Comment
 ********************************************************************/
commentsRouter.post('/create', async (req: Request, res: Response) => {
	try {
		const comment: Comment = await prisma.comment.create({
			data: {
				content: req.body.content,
				userId: 1,
				pageId: req.body.pageId,
				parentId: req.body.parentId,
			},
		});
		res.json(comment);
	} catch (error) {
		console.log('Error creating comment:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
