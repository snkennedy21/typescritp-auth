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
exports.endpointsRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
exports.endpointsRouter = express_1.default.Router();
exports.endpointsRouter.get("/protected", middleware_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HELLO");
    res.json({ message: "Yes, you can view this content" });
}));
exports.endpointsRouter.get("/unprotected", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "This content is not protected" });
}));
//# sourceMappingURL=endpoints.js.map