// src/controllers/ReclamacaoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getReclamacoes = async (req: Request, res: Response): Promise<void> => {
    try {
        const reclamacoes = await prisma.reclamacao.findMany({
            include: {
                multa: {
                    include: {
                        automobilista: {
                            include: {
                                pessoa: {
                                    include: {
                                        endereco: true,
                                        bi: true,
                                        contacto: true,
                                    },
                                },
                                cartaconducao: true,
                            },
                        },
                        viatura: true,
                        reclamacao: true,
                        pagamentomulta: true,
                        funcionario: {
                            include: {
                                pessoa: true,
                            },
                        },
                        infracao: {
                            include: {
                                tipoinfracao: true
                            }
                        },
                    },
                }, // Inclui o relacionamento com o modelo multa
            },
        });
        res.status(200).json(reclamacoes);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as reclamações' });
    }
};

export const getReclamacaoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const reclamacao = await prisma.reclamacao.findUnique({
            where: { codReclamacao: Number(id) },
            include: {
                multa: {
                    include: {
                        automobilista: {
                            include: {
                                pessoa: {
                                    include: {
                                        endereco: true,
                                        bi: true,
                                        contacto: true,
                                    },
                                },
                                cartaconducao: true,
                            },
                        },
                        viatura: true,
                        reclamacao: true,
                        pagamentomulta: true,
                        funcionario: {
                            include: {
                                pessoa: true,
                            },
                        },
                        infracao: {
                            include: {
                                tipoinfracao: true
                            }
                        },
                    },
                }, // Inclui o relacionamento com o modelo multa
            },
        });

        if (reclamacao) {
            res.status(200).json(reclamacao);
        } else {
            res.status(404).json({ message: 'Reclamação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a reclamação' });
    }
};

export const createReclamacao = async (req: Request, res: Response): Promise<void> => {
    const { codMulta, motivo} = req.body;

    try {
        const newReclamacao = await prisma.reclamacao.create({
            data: {
                codMulta: Number(codMulta),
                motivo,
            },
        });
        res.status(201).json(newReclamacao);
    } catch (err) {
        res.status(500).json({err, error: 'Não foi possível criar a reclamação' });
    }
};

export const updateReclamacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { codMulta, motivo, status, observacao } = req.body;

    try {
        const updatedReclamacao = await prisma.reclamacao.update({
            where: { codReclamacao: Number(id) },
            data: {
                codMulta,
                motivo,
                status,
                observacao,
            },
            include: {
                multa: true, // Inclui o relacionamento com o modelo multa
            },
        });
        res.status(200).json(updatedReclamacao);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a reclamação' });
    }
};

export const deleteReclamacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.reclamacao.delete({
            where: { codReclamacao: Number(id) },
        });
        res.status(200).json({ message: 'Reclamação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a reclamação' });
    }
};
