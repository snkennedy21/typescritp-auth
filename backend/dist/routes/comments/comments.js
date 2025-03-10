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
exports.commentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../prisma");
exports.commentsRouter = express_1.default.Router();
/*********************************************************************
 * * Get Comments For Page
 * @returns {Comment[]} - Array of all Comments
 ********************************************************************/
exports.commentsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageId } = req.query;
        const comments = yield prisma_1.prisma.comment.findMany({
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
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/*********************************************************************
 * * Create New Comment
 * @returns {Comment} - The newly created Comment
 ********************************************************************/
exports.commentsRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield prisma_1.prisma.comment.create({
            data: {
                content: req.body.content,
                userId: 1,
                pageId: req.body.pageId,
                parentId: null,
            },
        });
        res.json(comment);
    }
    catch (error) {
        console.log('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//# sourceMappingURL=comments.js.map