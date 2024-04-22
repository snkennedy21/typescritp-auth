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
const express_1 = __importDefault(require("express"));
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const endpoints_1 = require("../../routes/endpoints/endpoints");
const app = (0, express_1.default)();
app.use(endpoints_1.endpointsRouter);
(0, vitest_1.describe)("Endpoints Route", () => {
    (0, vitest_1.it)("GET /unprotected should return a message indicating that the content is not protected", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app)
            .get("/unprotected")
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual({
                message: "This content is not protected",
            });
        });
    }));
});
//# sourceMappingURL=endpoints.test.js.map