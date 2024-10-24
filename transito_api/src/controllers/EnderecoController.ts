// src/controllers/EnderecoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEnderecos = async (req: Request, res: Response): Promise<void> => {
    const enderecos = await prisma.endereco.findMany({
        include: {
            municipio: true,
            pessoa: true
        }
    });
    res.status(200).json(enderecos);
};

export const getEnderecoById = async (req: Request, res: Response): Promise<void> => {
    const endereco = await prisma.endereco.findUnique({
        where: { idEndereco: Number(req.params.id) },
        include: {
            municipio: true,
            pessoa: true
        }
    });

    if (endereco) {
        res.status(200).json(endereco);
    } else {
        res.status(404).json({ message: 'Endereço não encontrado' });
    }
};

export const createEndereco = async (req: Request, res: Response): Promise<void> => {
    const { idMunicipio, descricaoEndereco, pessoa } = req.body;
    const newEndereco = await prisma.endereco.create({
        data: {
            idMunicipio,
            descricaoEndereco,
            pessoa: { connect: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(201).json(newEndereco);
};

export const updateEndereco = async (req: Request, res: Response): Promise<void> => {
    const { idMunicipio, descricaoEndereco, pessoa } = req.body;
    const updatedEndereco = await prisma.endereco.update({
        where: { idEndereco: Number(req.params.id) },
        data: {
            idMunicipio,
            descricaoEndereco,
            pessoa: { set: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(200).json(updatedEndereco);
};

export const deleteEndereco = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.endereco.delete({ where: { idEndereco: Number(req.params.id) } });
        res.status(200).json({ message: 'Endereço deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Endereço não encontrado' });
    }
};
