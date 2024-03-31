"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "super_secret_access_key";
const loginRequired = (req, res, next) => {
    // const authHeader: string | undefined = req.headers["authorization"];
    // const token: string | undefined = authHeader && authHeader.split(" ")[1];
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    if (!accessToken && refreshToken) {
        return res.status(403).json({ error: "Forbidden: Access token expired" });
    }
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }
    jsonwebtoken_1.default.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }
        // If token is valid, attach the decoded payload to the request object
        req.user = decoded;
        next();
    });
};
exports.loginRequired = loginRequired;
//# sourceMappingURL=middleware.js.map