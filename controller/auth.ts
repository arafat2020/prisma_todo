import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createToken, verifyJwt } from "../lib/jwt";
import { PrismaClient } from "@prisma/client";
import { hashed, verifyHash } from "../lib/hash";

const prisma = new PrismaClient()
const { log } = console


export const cretaeUSer = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) res.sendStatus(400)
    if (!name || !email || !password) return
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: `${await hashed(password)}`
        }
    }).then(user => {
        const token: String = createToken(user.id, name)
        prisma.token.create({
            data: {
                token: `${token}`,
                relId: user.id
            }
        }).then(async data => {
            await prisma.$disconnect()
            res.send({
                user: user,
                token: data.token
            })
        }).catch(async err => {
            await prisma.$disconnect()
            res.status(404).send({
                id: 2,
                err
            })
        })
    }).catch(async err => {
        await prisma.$disconnect()

        res.status(404).send({
            id: 3,
            err
        })
    })
})

export const verifyUser = expressAsyncHandler((req: Request, res: Response) => {
    const { token } = req.body
    if (!token) res.sendStatus(400)
    if (!token) return
    res.send(verifyJwt(token))
})

export const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) res.sendStatus(400)
    if (!email || !password) return
    prisma.user.findUnique({
        where: {
            email: email
        }
    }).then(async user => {
        const isAuth = await verifyHash(password, `${user?.password}`)
        if (!isAuth) res.sendStatus(401)
        if (!isAuth) return
        const token: string = createToken(parseInt(`${user?.id}`),`${user?.name}`)
        await prisma.token.create({
            data:{
                token:`${token}`,
                relId:parseInt(`${user?.id}`)
            }
        }).then(async token=>{
            res.send({
                user:user,
                token:token.token
            })
        }).catch(err=>{
            res.sendStatus(401).send(err)
        })
        
        prisma.$disconnect()
    }).catch(err => {
        res.send({
            err,
            msg: 'user not found'
        })
    })
})