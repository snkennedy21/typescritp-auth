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
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userRouter = express_1.default.Router();
// ************* //
// Get all users //
// ************* //
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
// ***************** //
// Create a new user //
// ***************** //
exports.userRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age, password } = req.body;
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
                age,
                password: hashedPassword,
            },
        });
        delete user.password;
        res.json(user);
    }
    catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// *********************** //
// Get a single user by ID //
// *********************** //
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
// ******************* //
// Delete a user by ID //
// ******************* //
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
// ************ //
// Login a user //
// ************ //
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
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, "super_secret_access_key", {
        expiresIn: "1m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, "super_secret_refresh_key", {
        expiresIn: "1m",
    });
    res.json({ accessToken, refreshToken });
}));
// ******************* //
// Refresh User Tokens //
// ******************* //
exports.userRouter.post("/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!refreshToken) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, "super_secret_refresh_key");
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id: decoded.userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id }, "super_secret_access_key", {
        expiresIn: "1m",
    });
    const newRefreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, "super_secret_refresh_key", {
        expiresIn: "1m",
    });
    res.json({ newAccessToken, newRefreshToken });
}));
//# sourceMappingURL=users.js.map