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

		// 1) Fetch the selected comment
		const selectedComment = await prisma.comment.findUnique({
			where: { id: numericId },
			include: { user: true },
		});

		if (!selectedComment) {
			return res.status(404).json({ error: 'Comment not found.' });
		}

		// 2) Build the chain of ancestors: from top-level down to selected
		const chain = await buildCommentChain(selectedComment);

		// 3) Fetch direct replies of the selected comment
		const replies = await prisma.comment.findMany({
			where: { parentId: numericId },
			include: { user: true },
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
	// We'll gather ancestors in an array
	// The final array will be top-level first, then down to the selected comment
	const chain: Comment[] = [comment];

	let currentParentId = comment.parentId;

	// Keep walking up while parentId is not null
	while (currentParentId) {
		const parent = await prisma.comment.findUnique({
			where: { id: currentParentId },
			include: { user: true },
		});
		if (!parent) break; // Shouldn't normally happen unless data is inconsistent

		chain.push(parent);
		currentParentId = parent.parentId;
	}

	// Currently, chain[] is from the child upward to the top-level.
	// We can reverse() so it goes from top-level down to the selected comment:
	chain.reverse();

	return chain;
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
