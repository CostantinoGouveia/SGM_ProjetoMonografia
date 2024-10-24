import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const td = z.object({
    DATABASE_URL: z.string(),
    JWT_KEY: z.string()
})
export const db = () => td.parse(process.env)
export async function login(req: Request, res: Response) {
    const user = req.body
    const newUser = await prisma.usuario.findFirst({
        where: {
            OR: [
                {
                    bi: { equals: user.bi as string }
                },
                {
                    telefone: { equals: user.bi as string }
                },
                {
                    numeroAgente: { equals: user.bi as string }
                }
            ]
        },
        include: {
            pessoa: true,
        },
    });
    if (newUser) {
        console.log(req.body)
        const passVerify = await bcrypt.compare(user.password, newUser.senha)
        if (passVerify) {
            const payload = { login: user.bi, tipo: user.tipoUsuario }
            console.log("Logado!!!!!!!!!!")
            const token = jwt.sign(payload, db().JWT_KEY, { expiresIn: '1h' })
            console.log(token)
            return res.json({ token, newUser }).status(200)
        }
        else
            return res.json({ error: "senha ou ", user }).status(403)
    }
    else
        return res.json({ error: "usuario Não encontrado ", user }).status(403)
}

export async function login_automobilista(req: Request, res: Response) {
    const user = req.body
    const newUser = await prisma.usuario.findFirst({
        where: {
            OR: [
                {
                    bi: { equals: user.bi as string }
                },
                {
                    telefone: { equals: user.bi as string }
                }
            ]
        },
        include: {
            pessoa: true,
        },
    });
    if (newUser) {
        console.log(req.body)
        const passVerify = await bcrypt.compare(user.password, newUser.senha)
        if (passVerify) {
            const payload = { login: user.bi, tipo: user.tipoUsuario }
            console.log("Logado automobilista!!!!!!!!!!")
            const token = jwt.sign(payload, db().JWT_KEY, { expiresIn: '1h' })
            console.log(token)
            return res.json({ token, newUser }).status(200)
        }
        else
            return res.json({ error: "senha ou ", user }).status(403)
    }
    else
        return res.json({ error: "usuario Não encontrado ", user }).status(403)
}

export function verifyToken(req: Request, res: Response) {
    const decor = jwt.verify(req.body.token, db().JWT_KEY, (err: any, decoded: any) => {
        if (err) {
            console.error('Erro ao verificar token:', err.message);
            return res.status(401).json({ error: 'Token inválido' });
        }
        console.log(decoded); // Decodifica o payload do token e o coloca no objeto req
    });

}
