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
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// GET /api/comments/:commentId/chain
exports.commentsRouter.get('/:commentId/chain', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const numericId = Number(commentId);
        // 1) Fetch the selected comment
        const selectedComment = yield prisma_1.prisma.comment.findUnique({
            where: { id: numericId },
            include: { user: true },
        });
        if (!selectedComment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        // 2) Build the chain of ancestors: from top-level down to selected
        const chain = yield buildCommentChain(selectedComment);
        // 3) Fetch direct replies of the selected comment
        const replies = yield prisma_1.prisma.comment.findMany({
            where: { parentId: numericId },
            include: { user: true },
        });
        // Return shape: { chain, replies }
        res.status(200).json({ chain, replies });
    }
    catch (error) {
        console.error('Error fetching chain:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Helper to walk up the parent chain
function buildCommentChain(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        // We'll gather ancestors in an array
        // The final array will be top-level first, then down to the selected comment
        const chain = [comment];
        let currentParentId = comment.parentId;
        // Keep walking up while parentId is not null
        while (currentParentId) {
            const parent = yield prisma_1.prisma.comment.findUnique({
                where: { id: currentParentId },
                include: { user: true },
            });
            if (!parent)
                break; // Shouldn't normally happen unless data is inconsistent
            chain.push(parent);
            currentParentId = parent.parentId;
        }
        // Currently, chain[] is from the child upward to the top-level.
        // We can reverse() so it goes from top-level down to the selected comment:
        chain.reverse();
        return chain;
    });
}
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
                parentId: req.body.parentId,
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