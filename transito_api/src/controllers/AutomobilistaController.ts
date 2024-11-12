// src/controllers/AutomobilistaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAutomobilistas = async (req: Request, res: Response): Promise<void> => {
    const automobilistas = await prisma.automobilista.findMany({
        include: {
            alertaroubo: true,
            cartaconducao: {
                include: {
                    categoriacarta: true,
                },
            },
            pessoa: {
                include: {
                    contacto: true,
                    endereco: {
                        include: {
                            municipio: {
                                include: {
                                    provincia: true
                                },
                            },
                        },
                    },
                    pais: true,
                    bi: true,
                    titulopropriedade: true
                }
            },
            multa: {
                include: {
                    infracao: {
                        include:{
                            tipoinfracao: true
                        }
                    },
                    funcionario: true,
                    pagamentomulta: true
                }
            }
        }
    });
    res.status(200).json(automobilistas);
};

export const getAutomobilistaById = async (req: Request, res: Response): Promise<void> => {
    const automobilista = await prisma.automobilista.findUnique({
        where: { codAutomobilista: Number(req.params.id) },
        include: {
            alertaroubo: true,
            cartaconducao: {
                include: {
                    categoriacarta: true,
                },
            },
            pessoa: {
                include: {
                    contacto: true,
                    endereco: true,
                    pais: true,
                    bi: true,
                    titulopropriedade: true
                }
            },
            multa: {
                include: {
                    infracao: {
                        include:{
                            tipoinfracao: true
                        }
                    },
                    funcionario: true,
                    pagamentomulta: true
                }
            }
        }
    });

    if (automobilista) {
        res.status(200).json(automobilista);
    } else {
        res.status(404).json({ message: 'Automobilista not found' });
    }
};

export const createAutomobilista = async (req: Request, res: Response): Promise<void> => {
    const { codCartaConducao, codPessoa, alertaroubo, cartaconducao, pessoa, multa } = req.body;
    const newAutomobilista = await prisma.automobilista.create({
        data: {
            codCartaConducao,
            codPessoa,
            alertaroubo: { create: alertaroubo },
            cartaconducao: { create: cartaconducao },
            pessoa: { create: pessoa },
            multa: { create: multa }
        }
    });
    res.status(201).json(newAutomobilista);
};

export const updateAutomobilista = async (req: Request, res: Response): Promise<void> => {
    const { codCartaConducao, codPessoa, alertaroubo, cartaconducao, pessoa, multa } = req.body;
    const updatedAutomobilista = await prisma.automobilista.update({
        where: { codAutomobilista: Number(req.params.id) },
        data: {
            codCartaConducao,
            codPessoa,
            alertaroubo: { set: alertaroubo },
            cartaconducao: { update: cartaconducao },
            pessoa: { update: pessoa },
            multa: { set: multa }
        }
    });
    res.status(200).json(updatedAutomobilista);
};

export const deleteAutomobilista = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.automobilista.delete({ where: { codAutomobilista: Number(req.params.id) } });
        res.status(200).json({ message: 'Automobilista deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Automobilista not found' });
    }
};
