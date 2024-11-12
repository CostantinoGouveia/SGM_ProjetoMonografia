import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all Viaturas
export const getViaturas = async (req: Request, res: Response): Promise<void> => {
  try {
    const viaturas = await prisma.viatura.findMany({
      include: {
        marca: true,
        livrete: {
          include: {
            serivicoviatura: true,
          },
        },
        alertaroubo: true,
        multa: true,
        titulopropriedade: {
          include: {
            pessoa: {
              include: {
                contacto: true,
                endereco: true,
                pais: true,
                bi: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(viaturas);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching viaturas' });
  }
};

// Get a single Viatura by ID
export const getViaturaById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const viatura = await prisma.viatura.findUnique({
      where: { codViatura: Number(id) },
      include: {
        marca: true,
        livrete: {
          include: {
            serivicoviatura: true,
          },
        },
        alertaroubo: true,
        multa: true,
        titulopropriedade: {
          include: {
            pessoa: {
              include: {
                contacto: true,
                endereco: true,
                pais: true,
                bi: true,
                automobilista: {
                  include: {
                    cartaconducao: true
                  },
                },
              },
            },
          },
        },
      },
    });
    if (viatura) {
      res.status(200).json(viatura);
    } else {
      res.status(404).json({ error: 'Viatura not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the viatura' });
  }
};

// Create a new Viatura
export const createViatura = async (req: Request, res: Response): Promise<void> => {
  const {
    codMarca,
    numeroQuadro,
    corViatura,
    MedidasPneumaticos,
    lotacao,
    cilindrada,
    numeroCilindro,
    conbustivel,
    peso,
    tara,
    tipoCaixa,
    distanciaEixo,
    modelo,
    numeroMatricula,
  } = req.body;

  try {
    const newViatura = await prisma.viatura.create({
      data: {
        codMarca,
        numeroQuadro,
        corViatura,
        MedidasPneumaticos,
        lotacao,
        cilindrada,
        numeroCilindro,
        conbustivel,
        peso,
        tara,
        tipoCaixa,
        distanciaEixo,
        modelo,
        numeroMatricula,
      },
    });
    res.status(201).json(newViatura);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the viatura' });
  }
};

// Update a Viatura
export const updateViatura = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    codMarca,
    numeroQuadro,
    corViatura,
    MedidasPneumaticos,
    lotacao,
    cilindrada,
    numeroCilindro,
    conbustivel,
    peso,
    tara,
    tipoCaixa,
    distanciaEixo,
    modelo,
    numeroMatricula,
  } = req.body;

  try {
    const updatedViatura = await prisma.viatura.update({
      where: { codViatura: Number(id) },
      data: {
        codMarca,
        numeroQuadro,
        corViatura,
        MedidasPneumaticos,
        lotacao,
        cilindrada,
        numeroCilindro,
        conbustivel,
        peso,
        tara,
        tipoCaixa,
        distanciaEixo,
        modelo,
        numeroMatricula,
      },
    });
    res.status(200).json(updatedViatura);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the viatura' });
  }
};

// Delete a Viatura
export const deleteViatura = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.viatura.delete({
      where: { codViatura: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the viatura' });
  }
};
