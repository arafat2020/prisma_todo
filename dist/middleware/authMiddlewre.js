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
exports.isAuthenticated = void 0;
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_1 = require("../lib/jwt");
const prisma = new client_1.PrismaClient();
const { log } = console;
exports.isAuthenticated = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    yield prisma.token.findMany({
        where: {
            token: token
        }
    }).then((token) => __awaiter(void 0, void 0, void 0, function* () {
        // log(token[0])
        if (!token[0])
            res.sendStatus(401);
        prisma.$disconnect();
        if (!token[0])
            return;
        req.body.decoded = yield (0, jwt_1.verifyJwt)(token[0].token);
        next();
    })).catch(err => {
        res.sendStatus(401).send(err);
    });
}));
//# sourceMappingURL=authMiddlewre.js.map