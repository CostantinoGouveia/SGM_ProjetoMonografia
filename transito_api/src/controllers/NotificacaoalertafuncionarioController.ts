import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNotificacoesFuncionario = async (req: Request, res: Response): Promise<void> => {
    let { id } = req.params;
    try {
        const notificacoes = await prisma.notificacaoalertafuncionario.findMany({
            where: { funcionario: {codPessoa: Number(id) } },
            include: {
                notificacaoalerta: {
                    include: { alertaroubo: true },
                },
                funcionario: {
                    include: {
                        pessoa: true,
                    },
                },
            },
        });
        res.status(200).json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as notificações do funcionário' });
    }
};

export const createNotificacoesFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { codNotificacao, funcionarios } = req.body;

    try {
        const notificacoes = funcionarios.map((codFuncionario: number) => ({
            codNotificacao: Number(codNotificacao),
            codFuncionario,
        }));

        const notificacoesCriadas = await prisma.notificacaoalertafuncionario.createMany({
            data: notificacoes,
        });
        res.status(201).json({ message: 'Notificações criadas com sucesso', notificacoesCriadas });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar as notificações' });
    }
};

export const updateNotificacaoFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const notificacaoAtualizada = await prisma.notificacaoalertafuncionario.update({
            where: { codNotificacaoFuncionario: Number(id) },
            data: { status },
        });
        res.status(200).json(notificacaoAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a notificação do funcionário' });
    }
};

export const deleteNotificacaoFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.notificacaoalertafuncionario.delete({
            where: { codNotificacaoFuncionario: Number(id) },
        });
        res.status(200).json({ message: 'Notificação do funcionário deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a notificação do funcionário' });
    }
};
