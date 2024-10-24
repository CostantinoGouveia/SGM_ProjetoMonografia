// src/controllers/InfracaoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInfracoes = async (req: Request, res: Response): Promise<void> => {
    const infracoes = await prisma.infracao.findMany({
        include: {
            multa: true,
            tipoinfracao: true
        }
    });
    res.status(200).json(infracoes);
};

export const getInfracaoById = async (req: Request, res: Response): Promise<void> => {
    const infracao = await prisma.infracao.findUnique({
        where: { codInfracao: Number(req.params.id) },
        include: {
            multa: true,
            tipoinfracao: true
        }
    });

    if (infracao) {
        res.status(200).json(infracao);
    } else {
        res.status(404).json({ message: 'Infração não encontrada' });
    }
};

export const createInfracao = async (req: Request, res: Response): Promise<void> => {
    const { codMulta, codTipoInfracao, multa_multa_codInfracaoToinfracao } = req.body;
    const newInfracao = await prisma.infracao.create({
        data: {
            codMulta,
            codTipoInfracao,
            multa_multa_codInfracaoToinfracao: {
                connect: multa_multa_codInfracaoToinfracao.map((m: { codMulta: number }) => ({ codMulta: m.codMulta }))
            }
        }
    });
    res.status(201).json(newInfracao);
};

export const updateInfracao = async (req: Request, res: Response): Promise<void> => {
    const { codMulta, codTipoInfracao, multa_multa_codInfracaoToinfracao } = req.body;
    const updatedInfracao = await prisma.infracao.update({
        where: { codInfracao: Number(req.params.id) },
        data: {
            codMulta,
            codTipoInfracao,
            multa_multa_codInfracaoToinfracao: {
                set: multa_multa_codInfracaoToinfracao.map((m: { codMulta: number }) => ({ codMulta: m.codMulta }))
            }
        }
    });
    res.status(200).json(updatedInfracao);
};

export const deleteInfracao = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.infracao.delete({ where: { codInfracao: Number(req.params.id) } });
        res.status(200).json({ message: 'Infração deletada' });
    } catch (error) {
        res.status(404).json({ message: 'Infração não encontrada' });
    }
};
