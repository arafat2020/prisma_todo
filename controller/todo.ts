import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient()

export const getTodo = expressAsyncHandler((req, res) => {
    const { decoded } = req.body
    prisma.todos.findMany({
        where: {
            authorId: decoded.data.id
        }
    }).then(todo => {
        res.send(todo)
    }).catch(err => {
        res.sendStatus(404).send(err)
    })
})

export const createTodo = expressAsyncHandler(async (req: Request, res: Response) => {
    const { title, content, decoded } = req.body
    if (!title || !content) res.sendStatus(400)
    if (!title || !content) return
    await prisma.todos.create({
        data: {
            title: title,
            content: content,
            authorId: decoded.data.id,
        }
    }).then(todo => {
        res.send(todo)
    }).catch(err => {
        res.sendStatus(400)
    })
})

export const doneTodo = expressAsyncHandler((req: Request, res: Response) => {
    const { id } = req.body
    if (!id) res.sendStatus(400)
    if (!id) return
    prisma.todos.update({
        where: {
            id: parseInt(id)
        },
        data: {
            done: true
        }
    }).then(toto=>{
        res.send(toto)
        prisma.$disconnect()
    })
})