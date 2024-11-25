import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNotificacoes = async (req: Request, res: Response): Promise<void> => {
    try {
        const notificacoes = await prisma.notificacaoalerta.findMany({
            include: {
                alertaroubo: true,
                notificacaoalertafuncionario: true,
            },
        });
        res.status(200).json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as notificações' });
    }
};

export const getNotificacaoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const notificacao = await prisma.notificacaoalerta.findUnique({
            where: { codNotificacao: Number(id) },
            include: {
                alertaroubo: true,
                notificacaoalertafuncionario: true,
            },
        });

        if (notificacao) {
            res.status(200).json(notificacao);
        } else {
            res.status(404).json({ message: 'Notificação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a notificação' });
    }
};

export const createNotificacao = async (req: Request, res: Response): Promise<void> => {
    const { codAlertaRoubo, mensagem } = req.body;

    try {
        const novaNotificacao = await prisma.notificacaoalerta.create({
            data: {
                codAlertaRoubo: Number(codAlertaRoubo),
                mensagem,
            },
            include: {
                alertaroubo: true,
            },
        });
        res.status(201).json(novaNotificacao);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a notificação' });
    }
};

export const updateNotificacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const notificacaoAtualizada = await prisma.notificacaoalerta.update({
            where: { codNotificacao: Number(id) },
            data: { status },
        });
        res.status(200).json(notificacaoAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a notificação' });
    }
};

export const deleteNotificacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.notificacaoalerta.delete({
            where: { codNotificacao: Number(id) },
        });
        res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a notificação' });
    }
};
