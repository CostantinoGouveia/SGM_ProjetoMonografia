// src/controllers/AutomobilistaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { gerarHashSenha } from './AutenticacaoController';

const prisma = new PrismaClient();
enum pessoa_genero {
    Masculino = "Masculino",
    Feminino = "Feminino",
  }

  
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
   let idBi1;
   let idContacto1;
   let idEndereco1;
    try {
        const [newBi, newContacto, newEndereco] = await prisma.$transaction([
            // Criar o BI
            prisma.bi.create({
                data: {
                    dataEmicaoBi: dados.data_emissao_bi,
                    dataValidacaoBi: dados.data_validade_bi,
                    numeroBI: dados.bi,
                    codFicheiroBi: 1
                }
            }),
            // Criar o Contato
            prisma.contacto.create({
                data: {
                    contacto1: dados.telemovel,
                    contacto2: dados.telemovel_alternativo,
                    email1: dados.email,
                    email2: dados.email_alternativo
                }
            }),
            // Criar o Endereço
            prisma.endereco.create({
                data: {
                    descricaoEndereco: dados.endereco,
                    idMunicipio: Number(dados.municipio)
                }
            }),

        ]);

        // Validação dos retornos
        if (!newBi || !newContacto || !newEndereco) {
            res.status(400).json({ error: "Falha ao criar BI, Contacto ou Endereço" });
            return;
        }else{
            idBi1 = newBi.idBi;
            idContacto1 = newContacto.idContacto;
            idEndereco1 = newEndereco.idEndereco;
        }

        // Criar o Automobilista e sua Pessoa
        const newAutomobilista = await prisma.automobilista.create({
            data: {
                cartaconducao: {
                    create: {
                        dataEmissao: dados.data_emissao_carta_conducao,
                        dataValidade: dados.data_validade_carta,
                        codCategoriaCarta: Number(dados.categoria),
                        numeroCarta: dados.numero_carta,
                        numeroVia: dados.numero_via,
                        localEmissao: dados.local_emissao,
                        dataPrimeiraEmissao: dados.data_primeira_emissao_carta,
                        codFicheiroCartaConducao: 1
                    }
                },
                pessoa: {
                    create: {
                        codNacionalidade: Number(dados.pais),
                        nome: dados.name,
                        dataNascimento: dados.data_nascimento,
                        genero: dados.sexo as pessoa_genero,
                        estadoCivil: dados.estado,
                        senha: "1",
                        codBi: newBi.idBi, // Será atualizado abaixo
                        codEndereco: newEndereco.idEndereco, // Será atualizado abaixo
                        codContacto: newContacto.idContacto // Será atualizado abaixo
                    }
                }
            },
            include: {
                pessoa: {
                    include: {
                        contacto: true,
                        endereco: true,
                        bi: true
                    }
                },
                cartaconducao: true
            },
        })
            const senha1 = await gerarHashSenha(newAutomobilista.pessoa.bi.numeroBI);

        const newUsuario = await prisma.usuario.create({

            data: {
                senha : senha1,
                bi: newAutomobilista.pessoa.bi.numeroBI,
                telefone: newAutomobilista.pessoa.contacto!.contacto1,
                numeroAgente: "",
                numeroCarta: newAutomobilista.cartaconducao.numeroCarta,
                codPessoa: Number(newAutomobilista.pessoa.codPessoa),
                tipoUsuario: "Automobilista",
            }
        });

        res.status(201).json({
            newAutomobilista,
        });
    } catch (error) {
        try {
            await prisma.bi.delete({ where: { idBi: idBi1 } });
            await prisma.contacto.delete({ where: { idContacto: idContacto1 } });
            await prisma.endereco.delete({ where: { idEndereco: idEndereco1 } });
            console.log({ message: 'dependecias deleted' });
        } catch (error1) {
            console.log({ message: 'dependencias not found', error});
        }
        console.error("Erro ao criar o Automobilista:", error);
        res.status(500).json({ error: "Erro ao criar o Automobilista e suas dependências." });
    }
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
