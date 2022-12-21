"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRoute = (0, express_1.Router)();
todoRoute.route('/todo').get();
exports.default = todoRoute;
//# sourceMappingURL=todo.js.map