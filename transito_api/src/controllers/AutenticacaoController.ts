import { $Enums, PrismaClient } from "@prisma/client";
import {NextFunction, Request, Response } from "express";
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
        if (passVerify  && !(newUser.tipoUsuario === $Enums.usuario_tipoUsuario.Automobilista)) {
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
                    numeroCarta: { equals: user.bi as string }
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
        if (passVerify && newUser.tipoUsuario === $Enums.usuario_tipoUsuario.Automobilista) {
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

export async function compararSenha(req: Request, res: Response) {
    const { senha, atual } = req.body;
    const match = await bcrypt.compare(senha, atual);
    return res.json({ match }).status(200);
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
   /* const decor = jwt.verify(req.body.token, db().JWT_KEY, (err: any, decoded: any) => {
        if (err) {
            console.error('Erro ao verificar token:', err.message);
            return res.status(401).json({ error: 'Token inválido' });
        }
        console.log(decoded); // Decodifica o payload do token e o coloca no objeto req
    });*/
    let token = req.body.token || req.headers['authorization']?.split(' ')[1];
    if (!token)
        return res.status(401).send({ error: "Token is required" })
    try {
        const decoder = jwt.verify(token, db().JWT_KEY)
        // req.id = (decoder as data).id
        console.log(decoder);
        return res.status(200).json({ valid: true, user: decoder });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({ error: "Token is expired" })
        }
        return res.status(401).send({ error: "Token is invalid" })
    }

}

export async function gerarHashSenha(senha: string): Promise<string> {
    const saltRounds = 3; // Número de saltos
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}