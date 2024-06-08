"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users/users");
const endpoints_1 = require("./routes/endpoints/endpoints");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = 8000;
exports.app = (0, express_1.default)();
const corsOptions = {
    origin: "http://react:8080",
    credentials: true, // Needed for cookies, authorization headers with HTTPS
    optionsSuccessStatus: 200,
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/users", users_1.userRouter);
exports.app.use("/endpoints", endpoints_1.endpointsRouter);
exports.app.listen(port, () => {
    console.log("now Listening on port 8000...");
});
//# sourceMappingURL=index.js.map