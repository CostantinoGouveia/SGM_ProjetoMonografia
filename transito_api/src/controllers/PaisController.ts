// src/controllers/PaisController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaises = async (req: Request, res: Response): Promise<void> => {
    try {
        const países = await prisma.pais.findMany({
            include: {
                pessoa: true,
            },
        });
        res.status(200).json(países);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os países' });
    }
};

export const getPaisById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const país = await prisma.pais.findUnique({
            where: { idPais: Number(id) },
            include: {
                pessoa: true,
            },
        });

        if (país) {
            res.status(200).json(país);
        } else {
            res.status(404).json({ message: 'País não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o país' });
    }
};

export const createPais = async (req: Request, res: Response): Promise<void> => {
    const { pais } = req.body;

    try {
        const newPais = await prisma.pais.create({
            data: {
                pais,
            },
            include: {
                pessoa: true,
            },
        });
        res.status(201).json(newPais);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o país' });
    }
};

export const updatePais = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { pais } = req.body;

    try {
        const updatedPais = await prisma.pais.update({
            where: { idPais: Number(id) },
            data: {
                pais,
            },
            include: {
                pessoa: true,
            },
        });
        res.status(200).json(updatedPais);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o país' });
    }
};

export const deletePais = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.pais.delete({
            where: { idPais: Number(id) },
        });
        res.status(200).json({ message: 'País deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o país' });
    }
};
