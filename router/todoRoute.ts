import { Router } from "express";
import { createTodo, doneTodo, getTodo } from "../controller/todo";
import { isAuthenticated } from "../middleware/authMiddlewre";

const todoRoute = Router()

todoRoute.use(isAuthenticated)
todoRoute.route('/todo').get(getTodo)
todoRoute.route('/todo').post(createTodo)
todoRoute.route('/todoDone').post(doneTodo)

export default todoRoute