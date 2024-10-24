// src/controllers/LivreteController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {z}  from "zod";

const prisma = new PrismaClient();

export const getLivretes = async (req: Request, res: Response): Promise<void> => {
    try {
        const livretes = await prisma.livrete.findMany({
            include: {
                viatura: true,
                serivicoviatura: true,
            },
        });
        res.status(200).json(livretes);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os livretes' });
    }
};

export const getLivreteById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const livrete = await prisma.livrete.findUnique({
            where: { codLivrete: Number(id) },
            include: {
                viatura: true,
                serivicoviatura: true,
            },
        });

        if (livrete) {
            res.status(200).json(livrete);
        } else {
            res.status(404).json({ message: 'Livrete não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o livrete' });
    }
};

const type = z.object({
    codViatura: z.number().min(1),
    codServico: z.number().min(1),
    dataEmissao: z.string(),
    dataPrimeiroRegistro: z.string()
})

export const createLivrete = async (req: Request, res: Response): Promise<void> => {
    const dados =  type.parse(req.body);

    try {
        const newLivrete = await prisma.livrete.create({
            data: dados,
            include: {
                viatura: true,
                serivicoviatura: true,
            },
        });

        res.status(201).json(newLivrete);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o livrete' });
    }
};

export const updateLivrete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const dados =  type.parse(req.body);

    try {
        const updatedLivrete = await prisma.livrete.update({
            where: { codLivrete: Number(id) },
            data: dados,
            include: {
                viatura: true,
                serivicoviatura: true,
            },
        });

        res.status(200).json(updatedLivrete);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o livrete' });
    }
};

export const deleteLivrete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.livrete.delete({
            where: { codLivrete: Number(id) },
        });
        res.status(200).json({ message: 'Livrete deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o livrete' });
    }
};
