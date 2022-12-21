import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyJwt } from "../lib/jwt";
const prisma = new PrismaClient()

const { log } = console

export const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1]
    await prisma.token.findMany({
        where: {
            token: token
        }
    }).then(async token => {
        // log(token[0])
        if (!token[0]) res.sendStatus(401)
        prisma.$disconnect()
        if (!token[0]) return
        req.body.decoded = await verifyJwt(token[0].token)
        next()
    }).catch(err => {
        res.sendStatus(401).send(err)        
    })
})