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
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_KEY = "super_secret_access_key";
// Middleware to check if the user is authenticated
const loginRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the access token and refresh token from the cookies
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    // If the access token is not provided, but the refresh token is, then the access token has expired
    if (!accessToken && refreshToken) {
        return res.status(403).json({ error: "Forbidden: Access token expired" });
    }
    // If neither the access token nor the refresh token is provided, then the user is not authenticated
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }
    // Verify the access token
    jsonwebtoken_1.default.verify(accessToken, ACCESS_KEY, (err, decoded) => {
        if (err && refreshToken) {
            // If the access token is invalid, but the refresh token is provided, then the access token has expired
            return res.status(403).json({ error: "Forbidden: Access token expired" });
        }
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }
        req.user = decoded;
        next();
    });
});
exports.loginRequired = loginRequired;
//# sourceMappingURL=middleware.js.map