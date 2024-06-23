import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Make sure these are put in a .env file
const ACCESS_KEY = process.env.ACCESS_KEY as string;
const REFRESH_KEY = process.env.REFRESH_KEY as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const ACCESS_COOKIE_EXPIRY = parseInt(
	process.env.ACCESS_COOKIE_EXPIRY || '900000',
	10,
); // Convert string to integer
const REFRESH_COOKIE_EXPIRY = parseInt(
	process.env.REFRESH_COOKIE_EXPIRY || '604800000',
	10,
); // Convert string to integer

console.log('ACCESS_COOKIE_EXPIRY: ', ACCESS_COOKIE_EXPIRY);

if (!process.env.ACCESS_KEY) {
	throw new Error('ACCESS_KEY environment variable is not defined.');
}

if (!process.env.REFRESH_KEY) {
	throw new Error('REFRESH_KEY environment variable is not defined.');
}

export const generateAuthTokens = (userId: number) => {
	const accessToken: string = jwt.sign({ userId }, ACCESS_KEY, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	});

	const refreshToken: string = jwt.sign({ userId }, REFRESH_KEY, {
		expiresIn: REFRESH_TOKEN_EXPIRY,
	});

	return { accessToken, refreshToken };
};

export const setAuthCookies = (
	res: Response,
	accessToken: string,
	refreshToken: string,
) => {
	res.cookie('accessToken', accessToken, {
		httpOnly: true,
		maxAge: ACCESS_COOKIE_EXPIRY,
	});

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: REFRESH_COOKIE_EXPIRY,
	});

	res.cookie('isAuthenticated', 'True', {
		httpOnly: false,
		maxAge: ACCESS_COOKIE_EXPIRY,
	});

	res.cookie('isRefreshable', 'True', {
		httpOnly: false,
		maxAge: REFRESH_COOKIE_EXPIRY,
	});
};

module.exports = {
	generateAuthTokens,
	setAuthCookies,
};
