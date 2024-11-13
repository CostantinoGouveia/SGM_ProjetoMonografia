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
                        include: {
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
                        include: {
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
    const dados = req.body;
    console.log(dados);
    const newBi = await prisma.bi.create({
        data: {
                dataEmicaoBi: dados.data_emissao_bi,
                dataValidacaoBi: dados.data_validade_bi,
                numeroBI: dados.bi,
                codFicheiroBi: 1
        }
    })
    const newContacto = await prisma.contacto.create({
        data: {
            contacto1: dados.telemovel,
            contacto2: dados.telemovel_alternativo,
            email1: dados.email,
            email2: dados.email_alternativo
        }
    })
    const newEndereco = await prisma.endereco.create({
        data: {
            descricaoEndereco: dados.endereco,
            idMunicipio: 1
        }
    })
    const newAutomobilista = await prisma.automobilista.create({
        data: {
            cartaconducao: {
                create: {
                    dataEmissao: dados.data_emissao_carta_conducao,
                    dataValidade: dados.data_validade_carta,
                    codCategoriaCarta: 1,
                    numeroCarta: dados.numero_carta,
                    numeroVia: dados.numero_via,
                    localEmissao: dados.local_emissao,
                    dataPrimeiraEmissao: dados.data_primeira_emissao_carta,
                    codFicheiroCartaConducao: 1,
                }
            },
            pessoa: {
                create: {
                    codNacionalidade: 1,
                    nome: dados.name,
                    dataNascimento: dados.data_nascimento,
                    genero: dados.sexo,
                    estadoCivil: "Casado",
                    senha: "1",
                   codBi: newBi.idBi,
                    codEndereco: newEndereco.idEndereco,
                    codContacto:   newContacto.idContacto,
                }
            },
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
