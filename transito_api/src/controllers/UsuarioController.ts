// src/controllers/UsuarioController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Retorna todos os usuários
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                pessoa: true,
            },
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os usuários' });
    }
};

// Retorna um usuário pelo ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { codUsuario: Number(id) },
            include: {
                pessoa: true,
            },
        });

        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o usuário' });
    }
};

// Cria um novo usuário
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    const {
        senha,
        bi,
        numeroAgente,
        telefone,
        codPessoa,
        tipoUsuario,
    } = req.body;

    try {
        const pass = await bcrypt.hash(senha, 3)

        const newUsuario = await prisma.usuario.create({
            data: {
                senha : pass,
                bi,
                numeroAgente,
                telefone,
                codPessoa: Number(codPessoa),
                tipoUsuario,
            },
            include: {
                pessoa: true,
            },
        });
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o usuário' });
    }
};

// Atualiza um usuário existente
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        bi,
        numeroAgente,
        telefone,
        codPessoa,
        tipoUsuario,
    } = req.body;

    try {
        const updatedUsuario = await prisma.usuario.update({
            where: { codUsuario: Number(id) },
            data: {
                bi,
                numeroAgente,
                telefone,
                codPessoa: Number(codPessoa),
                tipoUsuario,
            },
            include: {
                pessoa: true,
            },
        });
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
    }
};

// Deleta um usuário
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.usuario.delete({
            where: { codUsuario: Number(id) },
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o usuário' });
    }
};

