import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'; // Certifique-se de ajustar o caminho para o arquivo do Prisma Client

const prisma = new PrismaClient();

// Criar uma nova notificação de multa
export const createNotificacaoReclamacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const {  codReclamacao, status, mensagem } = req.body;

    const novaNotificacao = await prisma.notificacaoreclamacao.create({
      data: {
        codReclamacao,
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
export const getNotificacoesReclamacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const notificacoes = await prisma.notificacaoreclamacao.findMany({
      include: {
        reclamacao: {
          include : {
            multa : {
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
                notificacaomulta: true,
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
            },
        },
      }},
    });

    res.status(200).json({ notificacoes });
  } catch (error) {
    console.error("Erro ao obter notificações:", error);
    res.status(500).json({ error: "Erro ao obter as notificações." });
  }
};

// Obter uma notificação de multa por ID
export const getNotificacaoReclamacaoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notificacao = await prisma.notificacaoreclamacao.findUnique({
      where: { codNotificacao: Number(id) },
      include: {
        reclamacao: {
          include : {
            multa : {
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
                notificacaomulta: true,
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
            },
        },
      }},
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

export const getNotificacaoReclamacaoMulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notificacao = await prisma.notificacaoreclamacao.findMany({
      where: { codReclamacao: Number(id) },
      include: {
        reclamacao: {
          include : {
            multa : {
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
                notificacaomulta: true,
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
            },
        },
      }},
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
export const updateNotificacaoReclamacao = async (req: Request, res: Response): Promise<void> => {
  try {    
    const { id } = req.params;
    const { status} = req.body;

    const notificacaoAtualizada = await prisma.notificacaoreclamacao.update({
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
export const deleteNotificacaoReclamacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.notificacaoreclamacao.delete({
      where: { codNotificacao: Number(id) },
    });

    res.status(200).json({ message: "Notificação excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir notificação:", error);
    res.status(500).json({ error: "Erro ao excluir a notificação." });
  }
};
