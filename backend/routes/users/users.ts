import express, { Request, Response, Router } from 'express';
import { prisma } from '../../prisma';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, CreateUserInput } from './users.d';
import {
	generateAuthTokens,
	setAuthCookies,
} from '../../utils/users/usersUtils';

export const userRouter: Router = express.Router();

const REFRESH_KEY = process.env.REFRESH_KEY as string;

/*********************************************************************
 * * Get All Users
 * @returns {User[]} - Array of all users
 ********************************************************************/
userRouter.get('/', async (req: Request, res: Response) => {
	try {
		const users: User[] = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

/*********************************************************************
 * * Create New User
 * @returns {User} - The newly created user
 ********************************************************************/
userRouter.post('/create', async (req: Request, res: Response) => {
	const { name, email, password }: CreateUserInput = req.body;
	try {
		const hashedPassword: string = await bcrypt.hash(password, 10);
		const existingUser: User | null = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			res.status(400).json({
				error: 'User with this email already exists',
			});
			return;
		}

		const user: User = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		delete user.password;

		const { accessToken, refreshToken } = generateAuthTokens(user.id);

		setAuthCookies(res, accessToken, refreshToken);

		res.json(user);
	} catch (error) {
		console.log('Error creating user:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

/*********************************************************************
 * * Get A User By ID
 * @returns {User} - The user with the specified ID
 ********************************************************************/
userRouter.get('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user: User | null = await prisma.user.findUnique({
			where: { id: parseInt(id) },
		});

		if (user === null) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		delete user.password;
		res.json(user);
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

/*********************************************************************
 * * Delete A User By ID
 * @returns {User} - The deleted user
 ********************************************************************/
userRouter.delete('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user: User = await prisma.user.delete({
			where: { id: parseInt(id) },
		});
		res.json(user);
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

/*********************************************************************
 * * Login User
 * @returns {newAccessToken, newRefreshToken}
 ********************************************************************/
userRouter.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user: User | null = await prisma.user.findUnique({
		where: { email },
	});

	if (user === null) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	if (user.password === undefined) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const passwordMatch: Boolean = await bcrypt.compare(
		password,
		user.password,
	);

	if (!passwordMatch) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const { accessToken, refreshToken } = generateAuthTokens(user.id);

	setAuthCookies(res, accessToken, refreshToken);

	delete user.password;

	res.json(user);
});

/*********************************************************************
 * * Refresh Tokens
 * @returns {newAccessToken, newRefreshToken}
 ********************************************************************/
userRouter.post('/refresh', async (req: Request, res: Response) => {
	const refreshToken = req.cookies['refreshToken'];

	if (!refreshToken) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const decoded = jwt.verify(refreshToken, REFRESH_KEY) as JwtPayload;

	const user: User | null = await prisma.user.findUnique({
		where: { id: decoded.userId },
	});

	if (!user) {
		throw new Error('User not found');
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
		generateAuthTokens(user.id);

	setAuthCookies(res, newAccessToken, newRefreshToken);

	delete user.password;

	res.json(user);
});

/*********************************************************************
 * * Logout User
 * @returns {message}
 ********************************************************************/
userRouter.post('/logout', (req: Request, res: Response) => {
	// Clear the accessToken cookie
	res.cookie('accessToken', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	// Clear the refreshToken cookie
	res.cookie('refreshToken', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	// Clear the isAuthenticated cookie
	res.cookie('isAuthenticated', '', {
		httpOnly: false,
		expires: new Date(0),
	});

	// Clear the isRefreshable cookie
	res.cookie('isRefreshable', '', {
		httpOnly: false,
		expires: new Date(0),
	});

	// Send a response indicating the user was logged out
	res.status(200).json({ message: 'Logged out successfully' });
});
