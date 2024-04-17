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
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    // If neither token is present, return unauthorized
    if (!accessToken && !refreshToken) {
        return res
            .status(401)
            .json({ error: "Unauthorized: Please Log In To View This" });
    }
    // If access token is present, verify it
    if (accessToken) {
        jsonwebtoken_1.default.verify(accessToken, ACCESS_KEY, (err, decoded) => {
            if (err) {
                if (refreshToken) {
                    // Instead of directly refreshing here, prompt client to refresh or redirect
                    return res.status(403).json({
                        error: "Forbidden: Access token expired, please refresh token",
                    });
                }
                return res.status(403).json({ error: "Forbidden: Invalid token" });
            }
            req.user = decoded;
            next();
        });
    }
    else if (refreshToken) {
        // Access token is missing but refresh token is present, prompt or redirect to refresh
        return res
            .status(403)
            .json({ error: "Forbidden: Access token expired, please refresh token" });
    }
});
exports.loginRequired = loginRequired;
// Okay, I think this is helpful as a middleware function. I am using RTK query to make all of my requests to my endpoints. Can you help me set up functionality in RTK query in my api calls that will do the following:
// If the middleware function returns error: "Forbidden: Access token expired, please refresh token", then RtK query should do the following. It should make a request to my '/refresh/' endpoint
//# sourceMappingURL=middleware.js.map