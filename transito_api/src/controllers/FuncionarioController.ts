// src/controllers/FuncionarioController.ts
import { Request, Response } from 'express';
import { pessoa_genero, PrismaClient } from '@prisma/client';
import { gerarHashSenha } from './AutenticacaoController';

const prisma = new PrismaClient();

export const getFuncionarios = async (req: Request, res: Response): Promise<void> => {
    const funcionarios = await prisma.funcionario.findMany({
        include: {
            pessoa: {
                include: {
                    contacto: true,
                    endereco: {
                        include: {
                            municipio: {
                                include: {
                                    provincia: true
                                }
                            }
                        }
                    },
                    bi: true,
                    pais: true,
                    usuario: true
                }
            }
        }
    });
    res.status(200).json(funcionarios);
};

export const getFuncionarioById = async (req: Request, res: Response): Promise<void> => {
    const funcionario = await prisma.funcionario.findUnique({
        where: { codFuncionario: Number(req.params.id) },
        include: {
            pessoa: {
                include: {
                    contacto: true,
                    endereco: {
                        include: {
                            municipio: {
                                include: {
                                    provincia: true
                                }
                            }
                        }
                    },
                    bi: true,
                    pais: true,
                    usuario: true
                }
            }
        }
    });

    if (funcionario) {
        res.status(200).json(funcionario);
    } else {
        res.status(404).json({ message: 'Funcionário não encontrado' });
    }
};

export const createFuncionario = async (req: Request, res: Response): Promise<void> => {
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
        } else {
            idBi1 = newBi.idBi;
            idContacto1 = newContacto.idContacto;
            idEndereco1 = newEndereco.idEndereco;
        }
        const newPesssoa = await prisma.pessoa.create({
            data: {
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
        });
        if (newPesssoa) {
            // Criar o funcinario e sua Pessoa
            const newFuncionario = await prisma.funcionario.create({
                data: {
                    codPessoa: newPesssoa.codPessoa,
                    numeroAgente: dados.numeroAgente,
                    senha: 1,
                    codficheiroFotoPerfil: 1,
                },
                include: {
                    pessoa: {
                        include: {
                            contacto: true,
                            endereco: {
                                include: {
                                    municipio: {
                                        include: {
                                            provincia: true
                                        }
                                    }
                                }
                            },
                            bi: true
                        }
                    }
                },
            })
            const senha1 = await gerarHashSenha(dados.numeroAgente);
            const newUsuario = await prisma.usuario.create({
                data: {
                    senha: senha1,
                    bi: newFuncionario.pessoa.bi.numeroBI,
                    telefone: newFuncionario.pessoa.contacto!.contacto1,
                    numeroAgente: newFuncionario.numeroAgente,
                    numeroCarta: "",
                    codPessoa: Number(newFuncionario.pessoa.codPessoa),
                    tipoUsuario: dados.tipoUsuario,
                }
            });

            res.status(201).json({
                newFuncionario,
            });
        } else {
            res.status(400).json({ error: "Falha ao criar Pessoa" });
            return;
        }
    } catch (error) {
        try {
            await prisma.bi.delete({ where: { idBi: idBi1 } });
            await prisma.contacto.delete({ where: { idContacto: idContacto1 } });
            await prisma.endereco.delete({ where: { idEndereco: idEndereco1 } });
            console.log({ message: 'dependecias deleted' });
        } catch (error1) {
            console.log({ message: 'dependencias not found', error });
        }
        console.error("Erro ao criar o Agente:", error);
        res.status(500).json({ error: "Erro ao criar o Agente e suas dependências." });
    }
};

export const updateFuncionario = async (req: Request, res: Response): Promise<void> => {
    const { codPessoa, codficheiroFotoPerfil, codficheiroFotoPendente, numeroAgente, senha } = req.body;
    const updatedFuncionario = await prisma.funcionario.update({
        where: { codFuncionario: Number(req.params.id) },
        data: {
            codPessoa,
            codficheiroFotoPerfil,
            codficheiroFotoPendente,
            numeroAgente,
            senha
        }
    });
    res.status(200).json(updatedFuncionario);
};

export const deleteFuncionario = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.funcionario.delete({ where: { codFuncionario: Number(req.params.id) } });
        res.status(200).json({ message: 'Funcionário deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Funcionário não encontrado' });
    }
};
