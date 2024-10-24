// src/controllers/TipoinfracaoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTiposInfracao = async (req: Request, res: Response): Promise<void> => {
    try {
        const tiposInfracao = await prisma.tipoinfracao.findMany({
            include: {
                infracao: true,
            },
        });
        res.status(200).json(tiposInfracao);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os tipos de infração' });
    }
};

export const getTipoInfracaoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const tipoInfracao = await prisma.tipoinfracao.findUnique({
            where: { codTipoInfracao: Number(id) },
            include: {
                infracao: true,
            },
        });

        if (tipoInfracao) {
            res.status(200).json(tipoInfracao);
        } else {
            res.status(404).json({ message: 'Tipo de infração não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o tipo de infração' });
    }
};

export const createTipoInfracao = async (req: Request, res: Response): Promise<void> => {
    const { descTipoInfracao, valorInfracao } = req.body;

    try {
        const newTipoInfracao = await prisma.tipoinfracao.create({
            data: {
                descTipoInfracao,
                valorInfracao,
            },
            include: {
                infracao: true,
            },
        });
        res.status(201).json(newTipoInfracao);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o tipo de infração' });
    }
};

export const updateTipoInfracao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { descTipoInfracao, valorInfracao } = req.body;

    try {
        const updatedTipoInfracao = await prisma.tipoinfracao.update({
            where: { codTipoInfracao: Number(id) },
            data: {
                descTipoInfracao,
                valorInfracao,
            },
            include: {
                infracao: true,
            },
        });
        res.status(200).json(updatedTipoInfracao);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o tipo de infração' });
    }
};

export const deleteTipoInfracao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.tipoinfracao.delete({
            where: { codTipoInfracao: Number(id) },
        });
        res.status(200).json({ message: 'Tipo de infração deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o tipo de infração' });
    }
};
