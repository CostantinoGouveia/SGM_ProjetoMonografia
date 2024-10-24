// src/controllers/FicheiroController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFicheiros = async (req: Request, res: Response): Promise<void> => {
    const ficheiros = await prisma.ficheiro.findMany({
        include: {
            bi: true,
            cartaconducao: true,
            funcionario: true,
            pagamentomulta: true,
            titulopropriedade: true
        }
    });
    res.status(200).json(ficheiros);
};

export const getFicheiroById = async (req: Request, res: Response): Promise<void> => {
    const ficheiro = await prisma.ficheiro.findUnique({
        where: { idFicheiro: Number(req.params.id) },
        include: {
            bi: true,
            cartaconducao: true,
            funcionario: true,
            pagamentomulta: true,
            titulopropriedade: true
        }
    });

    if (ficheiro) {
        res.status(200).json(ficheiro);
    } else {
        res.status(404).json({ message: 'Ficheiro não encontrado' });
    }
};

export const createFicheiro = async (req: Request, res: Response): Promise<void> => {
    const { nomeFicheiro, dataEntrada, dataValidacao, estadoValidacao, bi, cartaconducao, funcionario, pagamentomulta, titulopropriedade } = req.body;
    const newFicheiro = await prisma.ficheiro.create({
        data: {
            nomeFicheiro,
            dataEntrada: dataEntrada ? new Date(dataEntrada).toISOString() : null,
            dataValidacao: dataValidacao ? new Date(dataValidacao).toISOString() : null,
            estadoValidacao,
            bi: { connect: bi.map((b: { idBi: number }) => ({ idBi: b.idBi })) },
            cartaconducao: { connect: cartaconducao.map((c: { codCartaConducao: number }) => ({ codCartaConducao: c.codCartaConducao })) },
            funcionario: { connect: funcionario.map((f: { idFuncionario: number }) => ({ idFuncionario: f.idFuncionario })) },
            pagamentomulta: { connect: pagamentomulta.map((p: { idPagamentomulta: number }) => ({ idPagamentomulta: p.idPagamentomulta })) },
            titulopropriedade: { connect: titulopropriedade.map((t: { idTitulopropriedade: number }) => ({ idTitulopropriedade: t.idTitulopropriedade })) }
        }
    });
    res.status(201).json(newFicheiro);
};

export const updateFicheiro = async (req: Request, res: Response): Promise<void> => {
    const { nomeFicheiro, dataEntrada, dataValidacao, estadoValidacao, bi, cartaconducao, funcionario, pagamentomulta, titulopropriedade } = req.body;
    const updatedFicheiro = await prisma.ficheiro.update({
        where: { idFicheiro: Number(req.params.id) },
        data: {
            nomeFicheiro,
            dataEntrada: dataEntrada ? new Date(dataEntrada).toISOString() : null,
            dataValidacao: dataValidacao ? new Date(dataValidacao).toISOString() : null,
            estadoValidacao,
            bi: { set: bi.map((b: { idBi: number }) => ({ idBi: b.idBi })) },
            cartaconducao: { set: cartaconducao.map((c: { codCartaConducao: number }) => ({ codCartaConducao: c.codCartaConducao })) },
            funcionario: { set: funcionario.map((f: { idFuncionario: number }) => ({ idFuncionario: f.idFuncionario })) },
            pagamentomulta: { set: pagamentomulta.map((p: { idPagamentomulta: number }) => ({ idPagamentomulta: p.idPagamentomulta })) },
            titulopropriedade: { set: titulopropriedade.map((t: { idTitulopropriedade: number }) => ({ idTitulopropriedade: t.idTitulopropriedade })) }
        }
    });
    res.status(200).json(updatedFicheiro);
};

export const deleteFicheiro = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.ficheiro.delete({ where: { idFicheiro: Number(req.params.id) } });
        res.status(200).json({ message: 'Ficheiro deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Ficheiro não encontrado' });
    }
};
