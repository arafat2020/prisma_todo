"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const authRouter = (0, express_1.Router)();
authRouter.route('/createUser').post(auth_1.cretaeUSer);
authRouter.route('/isUser').post(auth_1.verifyUser);
authRouter.route('/login').post(auth_1.login);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map