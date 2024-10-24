// src/controllers/FuncionarioController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFuncionarios = async (req: Request, res: Response): Promise<void> => {
    const funcionarios = await prisma.funcionario.findMany({
        include: {
            ficheiro: true,
            pessoa: true
        }
    });
    res.status(200).json(funcionarios);
};

export const getFuncionarioById = async (req: Request, res: Response): Promise<void> => {
    const funcionario = await prisma.funcionario.findUnique({
        where: { codFuncionario: Number(req.params.id) },
        include: {
            ficheiro: true,
            pessoa: true
        }
    });

    if (funcionario) {
        res.status(200).json(funcionario);
    } else {
        res.status(404).json({ message: 'Funcionário não encontrado' });
    }
};

export const createFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { codPessoa, codficheiroFotoPerfil, codficheiroFotoPendente, numeroAgente, senha } = req.body;
    const newFuncionario = await prisma.funcionario.create({
        data: {
            codPessoa,
            codficheiroFotoPerfil,
            codficheiroFotoPendente,
            numeroAgente,
            senha
        }
    });
    res.status(201).json(newFuncionario);
};

export const updateFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { codPessoa, codficheiroFotoPerfil, codficheiroFotoPendente, numeroAgente, senha } = req.body;
    const updatedFuncionario = await prisma.funcionario.update({
        where: { codFuncionario: Number(req.params.id) },
        data: {
            codPessoa,
            codficheiroFotoPerfil,
            codficheiroFotoPendente,
            numeroAgente,
            senha
        }
    });
    res.status(200).json(updatedFuncionario);
};

export const deleteFuncionario = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.funcionario.delete({ where: { codFuncionario: Number(req.params.id) } });
        res.status(200).json({ message: 'Funcionário deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Funcionário não encontrado' });
    }
};
