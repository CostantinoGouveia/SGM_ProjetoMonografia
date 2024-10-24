// src/controllers/BiController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBis = async (req: Request, res: Response): Promise<void> => {
    const bis = await prisma.bi.findMany({
        include: {
            ficheiro: true,
            pessoa: true
        }
    });
    res.status(200).json(bis);
};

export const getBiById = async (req: Request, res: Response): Promise<void> => {
    const bi = await prisma.bi.findUnique({
        where: { idBi: Number(req.params.id) },
        include: {
            ficheiro: true,
            pessoa: true
        }
    });

    if (bi) {
        res.status(200).json(bi);
    } else {
        res.status(404).json({ message: 'BI não encontrado' });
    }
};

export const createBi = async (req: Request, res: Response): Promise<void> => {
    const { dataEmicaoBi, dataValidacaoBi, numeroBI, codFicheiroBi, pessoa } = req.body;
    const newBi = await prisma.bi.create({
        data: {
            dataEmicaoBi,
            dataValidacaoBi,
            numeroBI,
            codFicheiroBi,
            pessoa: { connect: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(201).json(newBi);
};

export const updateBi = async (req: Request, res: Response): Promise<void> => {
    const { dataEmicaoBi, dataValidacaoBi, numeroBI, codFicheiroBi, pessoa } = req.body;
    const updatedBi = await prisma.bi.update({
        where: { idBi: Number(req.params.id) },
        data: {
            dataEmicaoBi,
            dataValidacaoBi,
            numeroBI,
            codFicheiroBi,
            pessoa: { set: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(200).json(updatedBi);
};

export const deleteBi = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.bi.delete({ where: { idBi: Number(req.params.id) } });
        res.status(200).json({ message: 'BI deletado' });
    } catch (error) {
        res.status(404).json({ message: 'BI não encontrado' });
    }
};
