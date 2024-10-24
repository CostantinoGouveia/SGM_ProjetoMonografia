// src/controllers/TitulopropriedadeController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTitulosPropriedade = async (req: Request, res: Response): Promise<void> => {
    try {
        const titulosPropriedade = await prisma.titulopropriedade.findMany({
            include: {
                pessoa: true,
                viatura: true,
                ficheiro: true,
            },
        });
        res.status(200).json(titulosPropriedade);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os títulos de propriedade' });
    }
};

export const getTituloPropriedadeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const tituloPropriedade = await prisma.titulopropriedade.findUnique({
            where: { codTituloPropriedade: Number(id) },
            include: {
                pessoa: true,
                viatura: true,
                ficheiro: true,
            },
        });

        if (tituloPropriedade) {
            res.status(200).json(tituloPropriedade);
        } else {
            res.status(404).json({ message: 'Título de propriedade não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o título de propriedade' });
    }
};

export const createTituloPropriedade = async (req: Request, res: Response): Promise<void> => {
    const {
        codPessoa,
        dataEmissao,
        dataPrimeiroRegistro,
        numeroEmissao,
        codViatura,
        codFicheiroTituloPropriedade,
    } = req.body;

    try {
        const newTituloPropriedade = await prisma.titulopropriedade.create({
            data: {
                codPessoa,
                dataEmissao,
                dataPrimeiroRegistro,
                numeroEmissao,
                codViatura,
                codFicheiroTituloPropriedade,
                pessoa: { connect: { codPessoa: Number(codPessoa) } },
                viatura: { connect: { codViatura: Number(codViatura) } },
                ficheiro: { connect: { idFicheiro: Number(codFicheiroTituloPropriedade) } },
            },
            include: {
                pessoa: true,
                viatura: true,
                ficheiro: true,
            },
        });
        res.status(201).json(newTituloPropriedade);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o título de propriedade' });
    }
};

export const updateTituloPropriedade = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        codPessoa,
        dataEmissao,
        dataPrimeiroRegistro,
        numeroEmissao,
        codViatura,
        codFicheiroTituloPropriedade,
    } = req.body;

    try {
        const updatedTituloPropriedade = await prisma.titulopropriedade.update({
            where: { codTituloPropriedade: Number(id) },
            data: {
                codPessoa,
                dataEmissao,
                dataPrimeiroRegistro,
                numeroEmissao,
                codViatura,
                codFicheiroTituloPropriedade,
                pessoa: { connect: { codPessoa: Number(codPessoa) } },
                viatura: { connect: { codViatura: Number(codViatura) } },
                ficheiro: { connect: { idFicheiro: Number(codFicheiroTituloPropriedade) } },
            },
            include: {
                pessoa: true,
                viatura: true,
                ficheiro: true,
            },
        });
        res.status(200).json(updatedTituloPropriedade);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o título de propriedade' });
    }
};

export const deleteTituloPropriedade = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.titulopropriedade.delete({
            where: { codTituloPropriedade: Number(id) },
        });
        res.status(200).json({ message: 'Título de propriedade deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o título de propriedade' });
    }
};
