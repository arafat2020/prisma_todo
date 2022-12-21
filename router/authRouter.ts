import { Router } from "express";
import { cretaeUSer, login, verifyUser } from "../controller/auth";
const authRouter = Router()

authRouter.route('/createUser').post(cretaeUSer)
authRouter.route('/isUser').post(verifyUser)
authRouter.route('/login').post(login)

export default authRouter 
