// src/controllers/ProvinciaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProvincias = async (req: Request, res: Response): Promise<void> => {
    try {
        const provincias = await prisma.provincia.findMany({
            include: {
                municipio: true,
            },
        });
        res.status(200).json(provincias);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as províncias' });
    }
};

export const getProvinciaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const provincia = await prisma.provincia.findUnique({
            where: { idProvincia: Number(id) },
            include: {
                municipio: true,
            },
        });

        if (provincia) {
            res.status(200).json(provincia);
        } else {
            res.status(404).json({ message: 'Província não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a província' });
    }
};

export const createProvincia = async (req: Request, res: Response): Promise<void> => {
    const { provincia } = req.body;

    try {
        const newProvincia = await prisma.provincia.create({
            data: {
                provincia,
            },
            include: {
                municipio: true,
            },
        });
        res.status(201).json(newProvincia);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a província' });
    }
};

export const updateProvincia = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { provincia } = req.body;

    try {
        const updatedProvincia = await prisma.provincia.update({
            where: { idProvincia: Number(id) },
            data: {
                provincia,
            },
            include: {
                municipio: true,
            },
        });
        res.status(200).json(updatedProvincia);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a província' });
    }
};

export const deleteProvincia = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.provincia.delete({
            where: { idProvincia: Number(id) },
        });
        res.status(200).json({ message: 'Província deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a província' });
    }
};
