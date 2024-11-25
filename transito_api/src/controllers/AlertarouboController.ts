// src/controllers/AlertarouboController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAlertasRoubo1 = async (req: Request, res: Response): Promise<void> => {
    try {
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth(); // Mês atual (0 = janeiro, 11 = dezembro)
        const anoAtual = dataAtual.getFullYear();

        // Inicializar um array para armazenar os alertas por mês
        const alertasPorMes: any[] = [];

        // Iterar pelos meses até o mês atual
        for (let mes = 0; mes <= mesAtual; mes++) {
            // Calcular o primeiro dia e o último dia do mês atual
            const dataInicio = new Date(anoAtual, mes, 1); // Primeiro dia do mês
            const dataFim = new Date(anoAtual, mes + 1, 1); // Primeiro dia do próximo mês

            // Buscar os alertas de roubo do mês atual
            const alertas = await prisma.alertaroubo.findMany({
                where: {
                    dataFeita: {
                        gte: dataInicio,
                        lt: dataFim,
                    },
                },
                include: {
                    automobilista: {
                        include: {
                            cartaconducao: true,
                        },
                    },
                    tiporoubo: true,
                    notificacaoalerta: {
                        include: {
                            notificacaoalertafuncionario: {
                                include: {
                                    funcionario: {
                                        include: {
                                            pessoa: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    endereco: {
                        include: {
                            municipio: {
                                include: {
                                    provincia: true,
                                },
                            },
                        },
                    },
                    viatura: {
                        include: {
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
                            marca: true,
                        },
                    },
                },
            });

            // Adicionar os alertas do mês atual ao array
            alertasPorMes.push(alertas);
        }

        // Retornar o array de alertas por mês
        res.status(200).json(alertasPorMes);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar os alertas de roubo' });
    }
};


export const getAlertasRoubo = async (req: Request, res: Response): Promise<void> => {
    const alertasRoubo = await prisma.alertaroubo.findMany({
        include: {
            automobilista: {
                include  : {
                    cartaconducao : true,
                },
            },
            tiporoubo: true,
            notificacaoalerta: {
                include: {
                    notificacaoalertafuncionario: {
                        include: {
                            funcionario: {
                                include: {
                                    pessoa: true,
                                },
                            },
                        },
                    },
                },
            },
            endereco : {
                include : {
                    municipio: {
                        include:{
                            provincia : true,
                        },
                    },
                },
            },
            viatura: {
                include: {
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
                    marca :true,
                },
            }
        }
    });
    res.status(200).json(alertasRoubo);
};

export const getAlertaRouboById = async (req: Request, res: Response): Promise<void> => {
    const alertaRoubo = await prisma.alertaroubo.findUnique({
        where: { codAlertaRoubo: Number(req.params.id) },
        include: {
            automobilista: {
                include  : {
                    cartaconducao : true,
                },
            },
            tiporoubo: true,
            notificacaoalerta: {
                include: {
                    notificacaoalertafuncionario: {
                        include: {
                            funcionario: {
                                include: {
                                    pessoa: true,
                                },
                            },
                        },
                    },
                },
            },
            endereco : {
                include : {
                    municipio: {
                        include:{
                            provincia : true,
                        },
                    },
                },
            },
            viatura: {
                include: {
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
                    marca :true,
                },
            }
        }
    });

    if (alertaRoubo) {
        res.status(200).json(alertaRoubo);
    } else {
        res.status(404).json({ message: 'Alerta de roubo não encontrado' });
    }
};

export const createAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            codViatura,
            codAutomobilista,
            dataRoubo,
            codTipoRoubo,
            descRoubo,
            Dendereco,
            idMunicipio,
        } = req.body;

        const func = await prisma.funcionario.findMany({
            where: {
                pessoa: {
                    usuario: {
                        some: {
                            tipoUsuario: 'Transito',
                        },
                    },
                },
            },
            include: {
            pessoa: {
                include: {
                    usuario: true,
                },
            },
        },
        });
        // Validando a entrada (você pode adicionar validações mais avançadas aqui)
        if (!codAutomobilista || !dataRoubo || !codTipoRoubo || !descRoubo || !Dendereco || !idMunicipio) {
            res.status(400).json({ error: "Campos obrigatórios estão faltando" });
            return;
        }
        const newEndereco = await prisma.endereco.create({
            data: {
                idMunicipio: Number(idMunicipio),
                descricaoEndereco: String(Dendereco),
            }
        });
        // Criando um novo alerta de roubo
        const newAlertaRoubo = await prisma.alertaroubo.create({
            data: {
                codAutomobilista: Number(codAutomobilista),
                dataRoubo: new Date(dataRoubo), // Certifique-se de que o dataRoubo esteja no formato correto
                dataFeita: new Date(),
                codTipoRoubo: Number(codTipoRoubo),
                descRoubo: String(descRoubo),
                codViatura: Number(codViatura),
                codEndereco: newEndereco.idEndereco,
                notificacaoalerta: {
                    create: {
                        mensagem: 'Novo alerta de roubo',
                        notificacaoalertafuncionario: {
                            create: func.map((f) => ({
                                codFuncionario: f.codFuncionario,
                            })),
                        },
                    }
                },
            },
            include: {
                endereco: true,
                notificacaoalerta: {
                    include: {
                        notificacaoalertafuncionario: true,
                    },
                },
            }
        });

        // Retornando o novo registro criado
        res.status(201).json(newAlertaRoubo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o alerta de roubo" });
    }
};

export const updateAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    const { codAutomobilista, codViatura, dataRoubo, codEndereco, codTipoRoubo, descRoubo } = req.body;
    const updatedAlertaRoubo = await prisma.alertaroubo.update({
        where: { codAlertaRoubo: Number(req.params.id) },
        data: {
            codAutomobilista,
            codViatura,
            dataRoubo,
            codEndereco,
            codTipoRoubo,
            descRoubo,
            status: 'Cancelado',
        }
    });
    res.status(200).json(updatedAlertaRoubo);
};

export const deleteAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.alertaroubo.delete({ where: { codAlertaRoubo: Number(req.params.id) } });
        res.status(200).json({ message: 'Alerta de roubo deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Alerta de roubo não encontrado' });
    }
};
