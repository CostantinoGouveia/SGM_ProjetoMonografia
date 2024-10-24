// src/controllers/CartaconducaoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCartasConducao = async (req: Request, res: Response): Promise<void> => {
    const cartasConducao = await prisma.cartaconducao.findMany({
        include: {
            automobilista: true,
            categoriacarta: true,
            ficheiro: true
        }
    });
    res.status(200).json(cartasConducao);
};

export const getCartaConducaoById = async (req: Request, res: Response): Promise<void> => {
    const cartaConducao = await prisma.cartaconducao.findUnique({
        where: { codCartaConducao: Number(req.params.id) },
        include: {
            automobilista: true,
            categoriacarta: true,
            ficheiro: true
        }
    });

    if (cartaConducao) {
        res.status(200).json(cartaConducao);
    } else {
        res.status(404).json({ message: 'Carta de condução não encontrada' });
    }
};

export const createCartaConducao = async (req: Request, res: Response): Promise<void> => {
    const { dataEmissao, dataValidade, numeroVia, codCategoriaCarta, numeroCarta, dataPrimeiraEmissao, localEmissao, codFicheiroCartaConducao, automobilista } = req.body;
    const newCartaConducao = await prisma.cartaconducao.create({
        data: {
            dataEmissao,
            dataValidade,
            numeroVia,
            codCategoriaCarta,
            numeroCarta,
            dataPrimeiraEmissao,
            localEmissao,
            codFicheiroCartaConducao,
            automobilista: { connect: automobilista.map((a: { codAutomobilista: number }) => ({ codAutomobilista: a.codAutomobilista })) }
        }
    });
    res.status(201).json(newCartaConducao);
};

export const updateCartaConducao = async (req: Request, res: Response): Promise<void> => {
    const { dataEmissao, dataValidade, numeroVia, codCategoriaCarta, numeroCarta, dataPrimeiraEmissao, localEmissao, codFicheiroCartaConducao, automobilista } = req.body;
    const updatedCartaConducao = await prisma.cartaconducao.update({
        where: { codCartaConducao: Number(req.params.id) },
        data: {
            dataEmissao,
            dataValidade,
            numeroVia,
            codCategoriaCarta,
            numeroCarta,
            dataPrimeiraEmissao,
            localEmissao,
            codFicheiroCartaConducao,
            automobilista: { set: automobilista.map((a: { codAutomobilista: number }) => ({ codAutomobilista: a.codAutomobilista })) }
        }
    });
    res.status(200).json(updatedCartaConducao);
};

export const deleteCartaConducao = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.cartaconducao.delete({ where: { codCartaConducao: Number(req.params.id) } });
        res.status(200).json({ message: 'Carta de condução deletada' });
    } catch (error) {
        res.status(404).json({ message: 'Carta de condução não encontrada' });
    }
};
