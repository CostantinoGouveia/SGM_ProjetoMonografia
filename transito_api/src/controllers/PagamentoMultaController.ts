// src/controllers/PagamentoMultaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPagamentosMultaReferencia = async (req: Request, res: Response): Promise<void> => {
    const { referencia } = req.body;
    try {
  
    // Busca o pagamento pela referência
    const pagamento = await prisma.pagamentomulta.findUnique({
      where: { referencia },
    });
  
    if (pagamento) {
        res.status(200).json(pagamento);
    } else {
        res.status(404).json({ message: 'Pagamento de multa não encontrado' });
    }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os pagamento' });
    }
};

export const multaAtulizado = async (req: Request, res: Response): Promise<void> => {
    const { referencia } = req.body;
    try {
      // Simula a confirmação do pagamento
      const pagamentoAtualizado = await prisma.pagamentomulta.update({
        where: { referencia },
        data: { status: 'PAGO',
            multa: {
                update: {
                    dataPagamento: new Date,
                }
            }
         },
        include: {
            multa: true,
        }
      });
  
    if (pagamentoAtualizado) {
        res.status(200).json({
            mensagem: 'Pagamento confirmado com sucesso',
            pagamento: pagamentoAtualizado,
          });
    } else {
        res.status(404).json({ message: 'Pagamento de multa não encontrado' });
    }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os pagamento' });
    }
};
  
  
    
  

export const getPagamentosMulta = async (req: Request, res: Response): Promise<void> => {
    try {
        const pagamentosMulta = await prisma.pagamentomulta.findMany({
            include: {
                multa: true,
                ficheiro: true,
            },
        });
        res.status(200).json(pagamentosMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os pagamentos de multa' });
    }
};

export const getPagamentoMultaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const pagamentoMulta = await prisma.pagamentomulta.findUnique({
            where: { codPagamentoMulta: Number(id) },
            include: {
                multa: true,
                ficheiro: true,
            },
        });

        if (pagamentoMulta) {
            res.status(200).json(pagamentoMulta);
        } else {
            res.status(404).json({ message: 'Pagamento de multa não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar o pagamento de multa' });
    }
};

export const createPagamentoMulta = async (req: Request, res: Response): Promise<void> => {
    const {
        codMulta,
        valorPago,
        descCodigoDeposito,
        codFicheiroPagamento,
    } = req.body;

    try {
        const newPagamentoMulta = await prisma.pagamentomulta.create({
            data: {
                codMulta,
                valorPago,
                descCodigoDeposito,
                codFicheiroPagamento,
                multa: { connect: { codMulta: Number(codMulta) } },
                ficheiro: { connect: { idFicheiro: Number(codFicheiroPagamento) } },
            },
            include: {
                multa: true,
                ficheiro: true,
            },
        });
        res.status(201).json(newPagamentoMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o pagamento de multa' });
    }
};

export const updatePagamentoMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        codMulta,
        dataCriacao,
        valorPago,
        descCodigoDeposito,
        codFicheiroPagamento,
    } = req.body;

    try {
        const updatedPagamentoMulta = await prisma.pagamentomulta.update({
            where: { codPagamentoMulta: Number(id) },
            data: {
                codMulta,
                dataCriacao,
                valorPago,
                descCodigoDeposito,
                codFicheiroPagamento,
                multa: { connect: { codMulta: Number(codMulta) } },
                ficheiro: { connect: { idFicheiro: Number(codFicheiroPagamento) } },
            },
            include: {
                multa: true,
                ficheiro: true,
            },
        });
        res.status(200).json(updatedPagamentoMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o pagamento de multa' });
    }
};

export const deletePagamentoMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.pagamentomulta.delete({
            where: { codPagamentoMulta: Number(id) },
        });
        res.status(200).json({ message: 'Pagamento de multa deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o pagamento de multa' });
    }
};
