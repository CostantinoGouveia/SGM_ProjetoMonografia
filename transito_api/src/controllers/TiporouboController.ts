// src/controllers/TiporouboController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTiposRoubo = async (req: Request, res: Response): Promise<void> => {
    try {
        const tiposRoubo = await prisma.tiporoubo.findMany({
            include: {
                alertaroubo: true,
            },
        });
        res.status(200).json(tiposRoubo);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os tipos de roubo' });
    }
};

export const getTipoRouboById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const tipoRoubo = await prisma.tiporoubo.findUnique({
            where: { codTipoRoubo: Number(id) },
            include: {
                alertaroubo: true,
            },
        });

        if (tipoRoubo) {
            res.status(200).json(tipoRoubo);
        } else {
            res.status(404).json({ message: 'Tipo de roubo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o tipo de roubo' });
    }
};

export const createTipoRoubo = async (req: Request, res: Response): Promise<void> => {
    const { descTipoRoubo } = req.body;

    try {
        const newTipoRoubo = await prisma.tiporoubo.create({
            data: {
                descTipoRoubo,
            },
            include: {
                alertaroubo: true,
            },
        });
        res.status(201).json(newTipoRoubo);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o tipo de roubo' });
    }
};

export const updateTipoRoubo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { descTipoRoubo } = req.body;

    try {
        const updatedTipoRoubo = await prisma.tiporoubo.update({
            where: { codTipoRoubo: Number(id) },
            data: {
                descTipoRoubo,
            },
            include: {
                alertaroubo: true,
            },
        });
        res.status(200).json(updatedTipoRoubo);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o tipo de roubo' });
    }
};

export const deleteTipoRoubo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.tiporoubo.delete({
            where: { codTipoRoubo: Number(id) },
        });
        res.status(200).json({ message: 'Tipo de roubo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o tipo de roubo' });
    }
};
