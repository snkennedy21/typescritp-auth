"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users/users");
const endpoints_1 = require("./routes/endpoints/endpoints");
const body_parser_1 = __importDefault(require("body-parser"));
const port = 8000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/users", users_1.userRouter);
app.use("/endpoints", endpoints_1.endpointsRouter);
app.listen(port, () => {
    console.log("now Listening on port 8000...");
});
//# sourceMappingURL=index.js.map