"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersUtils_1 = require("../../utils/users/usersUtils");
exports.userRouter = express_1.default.Router();
const REFRESH_KEY = process.env.REFRESH_KEY;
/****************************************
 * * Get All Users
 * @returns {User[]} - Array of all users
 ****************************************/
exports.userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/******************************************
 * * Create New User
 * @returns {User} - The newly created user
 ******************************************/
exports.userRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({
                error: 'User with this email already exists',
            });
            return;
        }
        const user = yield prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        delete user.password;
        const { accessToken, refreshToken } = (0, usersUtils_1.generateAuthTokens)(user.id);
        (0, usersUtils_1.setAuthCookies)(res, accessToken, refreshToken);
        res.json(user);
    }
    catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**************************************************
 * * Get A User By ID
 * @returns {User} - The user with the specified ID
 **************************************************/
exports.userRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user === null) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        delete user.password;
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/************************************
 * * Delete A User By ID
 * @returns {User} - The deleted user
 ***********************************/
exports.userRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json(user);
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/********************************************
 * * Login User
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
exports.userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (user === null) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.password === undefined) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const { accessToken, refreshToken } = (0, usersUtils_1.generateAuthTokens)(user.id);
    (0, usersUtils_1.setAuthCookies)(res, accessToken, refreshToken);
    delete user.password;
    res.json(user);
}));
/********************************************
 * * Refresh Tokens
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
exports.userRouter.post('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_KEY);
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id: decoded.userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (0, usersUtils_1.generateAuthTokens)(user.id);
    (0, usersUtils_1.setAuthCookies)(res, newAccessToken, newRefreshToken);
    delete user.password;
    res.json(user);
}));
/********************************************
 * * Logout User
 * @returns {message}
 *******************************************/
exports.userRouter.post('/logout', (req, res) => {
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
//# sourceMappingURL=users.js.map