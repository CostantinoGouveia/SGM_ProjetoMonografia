// src/controllers/MunicipioController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMunicipios = async (req: Request, res: Response): Promise<void> => {
    try {
        const municipios = await prisma.municipio.findMany({
            include: {
                endereco: true,
                provincia: true,
            },
        });
        res.status(200).json(municipios);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os municípios' });
    }
};

export const getMunicipioById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const municipio = await prisma.municipio.findUnique({
            where: { idMunicipio: Number(id) },
            include: {
                endereco: true,
                provincia: true,
            },
        });

        if (municipio) {
            res.status(200).json(municipio);
        } else {
            res.status(404).json({ message: 'Município não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o município' });
    }
};

export const createMunicipio = async (req: Request, res: Response): Promise<void> => {
    const { idProvincia, municipio } = req.body;

    try {
        const newMunicipio = await prisma.municipio.create({
            data: {
                idProvincia: Number(idProvincia),
                municipio,
            },
            include: {
                endereco: true,
                provincia: true,
            },
        });
        res.status(201).json(newMunicipio);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o município' });
    }
};

export const updateMunicipio = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idProvincia, municipio } = req.body;

    try {
        const updatedMunicipio = await prisma.municipio.update({
            where: { idMunicipio: Number(id) },
            data: {
                idProvincia: Number(idProvincia),
                municipio,
            },
            include: {
                endereco: true,
                provincia: true,
            },
        });
        res.status(200).json(updatedMunicipio);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o município' });
    }
};

export const deleteMunicipio = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.municipio.delete({
            where: { idMunicipio: Number(id) },
        });
        res.status(200).json({ message: 'Município deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o município' });
    }
};
