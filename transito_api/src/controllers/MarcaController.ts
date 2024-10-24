// src/controllers/MarcaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMarcas = async (req: Request, res: Response): Promise<void> => {
    try {
        const marcas = await prisma.marca.findMany();
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as marcas' });
    }
};

export const getMarcaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const marca = await prisma.marca.findUnique({
            where: { codMarca: Number(id) },
        });

        if (marca) {
            res.status(200).json(marca);
        } else {
            res.status(404).json({ message: 'Marca não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a marca' });
    }
};

export const createMarca = async (req: Request, res: Response): Promise<void> => {
    const { codMarca, descMarca } = req.body;
    
    try {
        const newMarca = await prisma.marca.create({
            data: {
                codMarca,
                descMarca,
            },
        });

        res.status(201).json(newMarca);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a marca' });
    }
};

export const updateMarca = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { descMarca } = req.body;

    try {
        const updatedMarca = await prisma.marca.update({
            where: { codMarca: Number(id) },
            data: {
                descMarca,
            },
        });

        res.status(200).json(updatedMarca);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a marca' });
    }
};

export const deleteMarca = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await prisma.marca.delete({
            where: { codMarca: Number(id) },
        });

        res.status(200).json({ message: 'Marca deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a marca' });
    }
};
