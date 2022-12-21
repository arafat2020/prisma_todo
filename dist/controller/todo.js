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
exports.doneTodo = exports.createTodo = exports.getTodo = void 0;
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma = new client_1.PrismaClient();
exports.getTodo = (0, express_async_handler_1.default)((req, res) => {
    const { decoded } = req.body;
    prisma.todos.findMany({
        where: {
            authorId: decoded.data.id
        }
    }).then(todo => {
        res.send(todo);
    }).catch(err => {
        res.sendStatus(404).send(err);
    });
});
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, decoded } = req.body;
    if (!title || !content)
        res.sendStatus(400);
    if (!title || !content)
        return;
    yield prisma.todos.create({
        data: {
            title: title,
            content: content,
            authorId: decoded.data.id,
        }
    }).then(todo => {
        res.send(todo);
    }).catch(err => {
        res.sendStatus(400);
    });
}));
exports.doneTodo = (0, express_async_handler_1.default)((req, res) => {
    const { id } = req.body;
    if (!id)
        res.sendStatus(400);
    if (!id)
        return;
    prisma.todos.update({
        where: {
            id: parseInt(id)
        },
        data: {
            done: true
        }
    }).then(toto => {
        res.send(toto);
        prisma.$disconnect();
    });
});
//# sourceMappingURL=todo.js.map