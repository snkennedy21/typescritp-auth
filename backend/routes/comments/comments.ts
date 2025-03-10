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
			where: { pageId: pageId },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						role: {
							select: { id: true, name: true },
						},
					},
				},
			},
		});

		res.status(200).json(comments);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

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
				parentId: null,
			},
		});
		res.json(comment);
	} catch (error) {
		console.log('Error creating comment:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
