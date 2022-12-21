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
exports.login = exports.verifyUser = exports.cretaeUSer = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_1 = require("../lib/jwt");
const client_1 = require("@prisma/client");
const hash_1 = require("../lib/hash");
const prisma = new client_1.PrismaClient();
const { log } = console;
exports.cretaeUSer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        res.sendStatus(400);
    if (!name || !email || !password)
        return;
    yield prisma.user.create({
        data: {
            name: name,
            email: email,
            password: `${yield (0, hash_1.hashed)(password)}`
        }
    }).then(user => {
        const token = (0, jwt_1.createToken)(user.id, name);
        prisma.token.create({
            data: {
                token: `${token}`,
                relId: user.id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.$disconnect();
            res.send({
                user: user,
                token: data.token
            });
        })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.$disconnect();
            res.status(404).send({
                id: 2,
                err
            });
        }));
    }).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        res.status(404).send({
            id: 3,
            err
        });
    }));
}));
exports.verifyUser = (0, express_async_handler_1.default)((req, res) => {
    const { token } = req.body;
    if (!token)
        res.sendStatus(400);
    if (!token)
        return;
    res.send((0, jwt_1.verifyJwt)(token));
});
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        res.sendStatus(400);
    if (!email || !password)
        return;
    prisma.user.findUnique({
        where: {
            email: email
        }
    }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        const isAuth = yield (0, hash_1.verifyHash)(password, `${user === null || user === void 0 ? void 0 : user.password}`);
        if (!isAuth)
            res.sendStatus(401);
        if (!isAuth)
            return;
        const token = (0, jwt_1.createToken)(parseInt(`${user === null || user === void 0 ? void 0 : user.id}`), `${user === null || user === void 0 ? void 0 : user.name}`);
        yield prisma.token.create({
            data: {
                token: `${token}`,
                relId: parseInt(`${user === null || user === void 0 ? void 0 : user.id}`)
            }
        }).then((token) => __awaiter(void 0, void 0, void 0, function* () {
            res.send({
                user: user,
                token: token.token
            });
        })).catch(err => {
            res.sendStatus(401).send(err);
        });
        prisma.$disconnect();
    })).catch(err => {
        res.send({
            err,
            msg: 'user not found'
        });
    });
}));
//# sourceMappingURL=auth.js.map