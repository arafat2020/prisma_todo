import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'
import authRouter from './router/authRouter'
import todoRoute from './router/todoRoute'
const port = 2000 || process.env.PORT
const app = express()
app.use(express.json())
const prisma = new PrismaClient()

app.use(authRouter)
app.use(todoRoute)



app.get('/', (req: Request, res: Response) => {
    res.send({
        running: true,
        msg: 'ok'
    })
})




app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})