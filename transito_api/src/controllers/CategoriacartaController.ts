// src/controllers/CategoriacartaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategoriasCarta = async (req: Request, res: Response): Promise<void> => {
    const categoriasCarta = await prisma.categoriacarta.findMany({
        include: {
            cartaconducao: true
        }
    });
    res.status(200).json(categoriasCarta);
};

export const getCategoriaCartaById = async (req: Request, res: Response): Promise<void> => {
    const categoriaCarta = await prisma.categoriacarta.findUnique({
        where: { codCategoriaCarta: Number(req.params.id) },
        include: {
            cartaconducao: true
        }
    });

    if (categoriaCarta) {
        res.status(200).json(categoriaCarta);
    } else {
        res.status(404).json({ message: 'Categoria de carta não encontrada' });
    }
};

export const createCategoriaCarta = async (req: Request, res: Response): Promise<void> => {
    const { descCategoriaCarta, sigla, cartaconducao } = req.body;
    const newCategoriaCarta = await prisma.categoriacarta.create({
        data: {
            descCategoriaCarta,
            sigla,
            cartaconducao: { connect: cartaconducao.map((c: { codCartaConducao: number }) => ({ codCartaConducao: c.codCartaConducao })) }
        }
    });
    res.status(201).json(newCategoriaCarta);
};

export const updateCategoriaCarta = async (req: Request, res: Response): Promise<void> => {
    const { descCategoriaCarta, sigla, cartaconducao } = req.body;
    const updatedCategoriaCarta = await prisma.categoriacarta.update({
        where: { codCategoriaCarta: Number(req.params.id) },
        data: {
            descCategoriaCarta,
            sigla,
            cartaconducao: { set: cartaconducao.map((c: { codCartaConducao: number }) => ({ codCartaConducao: c.codCartaConducao })) }
        }
    });
    res.status(200).json(updatedCategoriaCarta);
};

export const deleteCategoriaCarta = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.categoriacarta.delete({ where: { codCategoriaCarta: Number(req.params.id) } });
        res.status(200).json({ message: 'Categoria de carta deletada' });
    } catch (error) {
        res.status(404).json({ message: 'Categoria de carta não encontrada' });
    }
};
