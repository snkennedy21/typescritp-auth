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
exports.userRouter = express_1.default.Router();
const ACCESS_KEY = "super_secret_access_key";
const REFRESH_KEY = "super_seccret_refresh_key";
const ACCESS_TOKEN_EXPIRY = "10s";
const REFRESH_TOKEN_EXPIRY = "5m";
const ACCESS_COOKIE_EXPIRY = 10 * 1000;
const REFRESH_COOKIE_EXPIRY = 5 * 60 * 1000;
/****************************************
 * * Get All Users
 * @returns {User[]} - Array of all users
 ****************************************/
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/******************************************
 * * Create New User
 * @returns {User} - The newly created user
 ******************************************/
exports.userRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ error: "User with this email already exists" });
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
        // Tokens are created to authenticate the user
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, ACCESS_KEY, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, REFRESH_KEY, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: ACCESS_COOKIE_EXPIRY,
        }); // Expires in 1 minute
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: REFRESH_COOKIE_EXPIRY,
        }); // Expires in 1 minute
        res.json(user);
    }
    catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/**************************************************
 * * Get A User By ID
 * @returns {User} - The user with the specified ID
 **************************************************/
exports.userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user === null) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        delete user.password;
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/************************************
 * * Delete A User By ID
 * @returns {User} - The deleted user
 ***********************************/
exports.userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json(user);
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/********************************************
 * * Login User
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (user === null) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.password === undefined) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, ACCESS_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, REFRESH_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: ACCESS_COOKIE_EXPIRY,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: REFRESH_COOKIE_EXPIRY,
    });
    res.cookie("isAuthenticated", accessToken, {
        httpOnly: false,
        maxAge: ACCESS_COOKIE_EXPIRY,
    });
    res.cookie("isRefreshable", refreshToken, {
        httpOnly: false,
        maxAge: REFRESH_COOKIE_EXPIRY,
    });
    res.json({ accessToken, refreshToken });
}));
/********************************************
 * * Refresh Tokens
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
exports.userRouter.post("/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_KEY);
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id: decoded.userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id }, ACCESS_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const newRefreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, REFRESH_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: ACCESS_COOKIE_EXPIRY,
    });
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: REFRESH_COOKIE_EXPIRY,
    });
    res.cookie("isAuthenticated", newAccessToken, {
        httpOnly: false,
        maxAge: ACCESS_COOKIE_EXPIRY,
    });
    res.cookie("isRefreshable", newRefreshToken, {
        httpOnly: false,
        maxAge: REFRESH_COOKIE_EXPIRY,
    });
    res.json({ newAccessToken, newRefreshToken });
}));
//# sourceMappingURL=users.js.map