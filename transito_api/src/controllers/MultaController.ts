// src/controllers/MultaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMultas = async (req: Request, res: Response): Promise<void> => {
    try {
        const multas = await prisma.multa.findMany({
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
                pagamentomulta: true,
                reclamacao: true,
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
        });
        res.status(200).json(multas);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as multas' });
    }
};

export const verificarMultas = async (req: Request, res: Response): Promise<void> => {
    try {
      const multasVencidas = await prisma.multa.findMany({
        where: {
          dataLimite: { lt: new Date() },   // Multas vencidas
          dataPagamento: null,              // Multas não pagas
          statusTribunal: false,            // Ainda não enviadas ao tribunal
         
        },
        include: {
            automobilista: true,
            viatura: true,
            pagamentomulta: true,
            notificacaomulta: true,
            reclamacao: true,
        },
      });
      
      // Atualiza o statusTribunal para cada multa vencida
      const atualizacoes = multasVencidas.map(async (multa) => {
        if (multa.pagamentomulta && multa.reclamacao.length == 0) { // Verifica se pagamentomulta existe
            return prisma.multa.update({
                where: { codMulta: multa.codMulta },
                data: {
                    statusTribunal: true,
                    pagamentomulta: {
                        update: {
                            where: { codPagamentoMulta: multa.pagamentomulta[0]?.codPagamentoMulta },
                            data: { status: 'Nao Pago' },
                        },
                    },
                },
            });
        }
        return null; // Se não houver pagamentomulta, ignora a atualização para essa multa
    });

    // Remove possíveis valores nulos caso não haja pagamentomulta
    const resultados = await Promise.all(atualizacoes.filter((update) => update !== null));

  
      res.status(200).json({ message: 'Multas vencidas verificadas e atualizadas', totalAtualizadas: atualizacoes.length });
    } catch (error) {
      console.error('Erro ao verificar multas:', error);
      res.status(500).json({ error: 'Erro ao verificar multas' });
    }
  };

export const getMultaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const multa = await prisma.multa.findUnique({
            where: { codMulta: Number(id) },
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
                reclamacao: {
                    include: {
                        notificacaoreclamacao: true,
                    },
                },
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
        });

        if (multa) {
            res.status(200).json(multa);
        } else {
            res.status(404).json({ message: 'Multa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a multa' });
    }
};

// Simular geração de referência de pagamento
function gerarReferencia() {
    return 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export const createMulta = async (req: Request, res: Response): Promise<void> => {
    const {
        codAutomobilista,
        codViatura,
        valorMulta,
        descricao,
        codFuncionario,
        infracoes
    } = req.body;
    console.log(req.body);
    try {
        const newMulta = await prisma.multa.create({
            data: {
                codAutomobilista: codAutomobilista ? Number(codAutomobilista) : undefined,
                CodViatura: codViatura ? Number(codViatura) : undefined,
                valorMulta: String(valorMulta),
                descMulta: descricao,
                codFuncionario: codFuncionario ? Number(codFuncionario) : undefined,
                estadoMulta: "PENDENTE",
                infracao: {
                    create: infracoes.map((infra: any) => ({
                        codTipoInfracao: infra.codTipoInfracao
                    }))
                },
                pagamentomulta: {
                    create: {
                        dataCriacao: new Date(),
                        valorPago: String(valorMulta),
                        status: "PENDENTE",
                        referencia: gerarReferencia(),
                        descCodigoDeposito: "TR-" + gerarReferencia(),
                    }

                },
                notificacaomulta: {
                    create: {
                        codAutomobilista: Number(codAutomobilista),
                        mensagem: "Nova multa aplicada",
                    }
                }
            },
            include: {
                infracao: true,
                pagamentomulta: true,
                notificacaomulta: true,
            }
        });
        res.status(201).json(newMulta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Não foi possível criar a multa' });
    }
};



export const updateMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        codAutomobilista,
        codViatura,
        valorMulta,
        estadoMulta,
    } = req.body;

    try {
        const updatedMulta = await prisma.multa.update({
            where: { codMulta: Number(id) },
            data: {
                codAutomobilista: codAutomobilista ? Number(codAutomobilista) : undefined,
                CodViatura: codViatura ? Number(codViatura) : undefined,
                valorMulta,
                estadoMulta,
            },
            include: {
                automobilista: true,
                viatura: true,
                pagamentomulta: true,
            },
        });
        res.status(200).json(updatedMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a multa' });
    }
};

export const deleteMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.multa.delete({
            where: { codMulta: Number(id) },
        });
        res.status(200).json({ message: 'Multa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a multa' });
    }
};
