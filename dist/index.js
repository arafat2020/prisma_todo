"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const todoRoute_1 = __importDefault(require("./router/todoRoute"));
const port = 2000 || process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.use(authRouter_1.default);
app.use(todoRoute_1.default);
app.get('/', (req, res) => {
    res.send({
        running: true,
        msg: 'ok'
    });
});
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map