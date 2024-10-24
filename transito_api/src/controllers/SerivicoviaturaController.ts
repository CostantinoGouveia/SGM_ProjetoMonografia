// src/controllers/SerivicoviaturaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServicosViatura = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicosViatura = await prisma.serivicoviatura.findMany({
            include: {
                livrete: true,
            },
        });
        res.status(200).json(servicosViatura);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os serviços de viatura' });
    }
};

export const getServicoViaturaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const servicoViatura = await prisma.serivicoviatura.findUnique({
            where: { codServicoViatura: Number(id) },
            include: {
                livrete: true,
            },
        });

        if (servicoViatura) {
            res.status(200).json(servicoViatura);
        } else {
            res.status(404).json({ message: 'Serviço de viatura não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o serviço de viatura' });
    }
};

export const createServicoViatura = async (req: Request, res: Response): Promise<void> => {
    const { descServico } = req.body;

    try {
        const newServicoViatura = await prisma.serivicoviatura.create({
            data: {
                descServico,
            },
            include: {
                livrete: true,
            },
        });
        res.status(201).json(newServicoViatura);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o serviço de viatura' });
    }
};

export const updateServicoViatura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { descServico } = req.body;

    try {
        const updatedServicoViatura = await prisma.serivicoviatura.update({
            where: { codServicoViatura: Number(id) },
            data: {
                descServico,
            },
            include: {
                livrete: true,
            },
        });
        res.status(200).json(updatedServicoViatura);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o serviço de viatura' });
    }
};

export const deleteServicoViatura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.serivicoviatura.delete({
            where: { codServicoViatura: Number(id) },
        });
        res.status(200).json({ message: 'Serviço de viatura deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o serviço de viatura' });
    }
};
