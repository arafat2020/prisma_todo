"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_1 = require("../controller/todo");
const authMiddlewre_1 = require("../middleware/authMiddlewre");
const todoRoute = (0, express_1.Router)();
todoRoute.use(authMiddlewre_1.isAuthenticated);
todoRoute.route('/todo').get(todo_1.getTodo);
todoRoute.route('/todo').post(todo_1.createTodo);
todoRoute.route('/todoDone').post(todo_1.doneTodo);
exports.default = todoRoute;
//# sourceMappingURL=todoRoute.js.map