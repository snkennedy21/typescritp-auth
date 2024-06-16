"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = exports.generateAuthTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Make sure these are put in a .env file
const ACCESS_KEY = process.env.ACCESS_KEY;
const REFRESH_KEY = process.env.REFRESH_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const ACCESS_COOKIE_EXPIRY = parseInt(process.env.ACCESS_COOKIE_EXPIRY || '900000', 10); // Convert string to integer
const REFRESH_COOKIE_EXPIRY = parseInt(process.env.REFRESH_COOKIE_EXPIRY || '604800000', 10); // Convert string to integer
if (!process.env.ACCESS_KEY) {
    throw new Error('ACCESS_KEY environment variable is not defined.');
}
if (!process.env.REFRESH_KEY) {
    throw new Error('REFRESH_KEY environment variable is not defined.');
}
const generateAuthTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, ACCESS_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, REFRESH_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return { accessToken, refreshToken };
};
exports.generateAuthTokens = generateAuthTokens;
const setAuthCookies = (res, accessToken, refreshToken) => {
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
exports.setAuthCookies = setAuthCookies;
module.exports = {
    generateAuthTokens: exports.generateAuthTokens,
    setAuthCookies: exports.setAuthCookies,
};
//# sourceMappingURL=usersUtils.js.map