import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'; // Certifique-se de ajustar o caminho para o arquivo do Prisma Client

const prisma = new PrismaClient();

// Criar uma nova notificação de multa
export const createNotificacaoMulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codAutomobilista, codMulta, status, mensagem } = req.body;

    const novaNotificacao = await prisma.notificacaomulta.create({
      data: {
        codAutomobilista,
        codMulta,
        status: status || "pendente",
        mensagem,
      },
    });

    res.status(201).json({ message: "Notificação criada com sucesso!", notificacao: novaNotificacao });
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    res.status(500).json({ error: "Erro ao criar a notificação." });
  }
};

// Obter todas as notificações de multa
export const getNotificacoesMulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const notificacoes = await prisma.notificacaomulta.findMany({
      include: {
        automobilista: true,
        multa: true,
      },
    });

    res.status(200).json({ notificacoes });
  } catch (error) {
    console.error("Erro ao obter notificações:", error);
    res.status(500).json({ error: "Erro ao obter as notificações." });
  }
};

// Obter uma notificação de multa por ID
export const getNotificacaoMultaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notificacao = await prisma.notificacaomulta.findUnique({
      where: { codNotificacao: Number(id) },
      include: {
        automobilista: true,
        multa: true,
      },
    });

    if (!notificacao) {
      res.status(404).json({ message: "Notificação não encontrada." });
      return;
    }

    res.status(200).json({ notificacao });
  } catch (error) {
    console.error("Erro ao obter notificação:", error);
    res.status(500).json({ error: "Erro ao obter a notificação." });
  }
};

export const getNotificacaoMultaAutomo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notificacao = await prisma.notificacaomulta.findMany({
      where: { codAutomobilista: Number(id) },
      include: {
        automobilista: true,
        multa: true,
      },
    });

    if (!notificacao) {
      res.status(404).json({ message: "Notificação não encontrada." });
      return;
    }

    res.status(200).json({ notificacao });
  } catch (error) {
    console.error("Erro ao obter notificação:", error);
    res.status(500).json({ error: "Erro ao obter a notificação." });
  }
};

// Atualizar uma notificação de multa
export const updateNotificacaoMulta = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("ola");
    
    const { id } = req.params;
    const { status} = req.body;

    const notificacaoAtualizada = await prisma.notificacaomulta.update({
      where: { codNotificacao: Number(id) },
      data: {
        status,
      },
    });

    res.status(200).json({ message: "Notificação atualizada com sucesso!", notificacao: notificacaoAtualizada });
  } catch (error) {
    console.error("Erro ao atualizar notificação:", error);
    res.status(500).json({ error: "Erro ao atualizar a notificação." });
  }
};

// Excluir uma notificação de multa
export const deleteNotificacaoMulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.notificacaomulta.delete({
      where: { codNotificacao: Number(id) },
    });

    res.status(200).json({ message: "Notificação excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir notificação:", error);
    res.status(500).json({ error: "Erro ao excluir a notificação." });
  }
};
