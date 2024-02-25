"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users");
const port = 8000;
const app = (0, express_1.default)();
app.use("/users", users_1.userRouter);
app.listen(port, () => {
    console.log("now Listening on port 8000...");
});
