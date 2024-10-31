// src/controllers/PessoaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPessoas = async (req: Request, res: Response): Promise<void> => {
    try {
        const pessoas = await prisma.pessoa.findMany({
            include: {
                automobilista: true,
                funcionario: true,
                contacto: true,
                endereco: true,
                pais: true,
                bi: true,
                titulopropriedade: true,
            },
        });
        res.status(200).json(pessoas);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Não foi possível buscar as pessoas' });
    }
};

export const getPessoaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const pessoa = await prisma.pessoa.findUnique({
            where: { codPessoa: Number(id) },
            include: {
                automobilista: {
                    include: {
                        cartaconducao: true,
                        multa: {
                            include: {
                                pagamentomulta: true,
                                infracao: {
                                    include: {
                                        tipoinfracao: true,
                                    },
                                },
                            },
                        },
                    },
                },
                funcionario: {
                    include: {
                        multa: {
                            include: {
                                pagamentomulta: true,
                                automobilista: {
                                    include: {
                                        pessoa: {
                                            include: {
                                                contacto: true,
                                                endereco: true,
                                                pais: true,
                                                bi: true,
                                                titulopropriedade: true,
                                            },
                                        },
                                    },
                                },
                                infracao: {
                                    include: {
                                        tipoinfracao: true,
                                    },
                                },
                            },
                        },
                    },
                },
                contacto: true,
                endereco: {
                    include: {
                        municipio: {
                            include: {
                                provincia: true,
                            },
                        },
                    },
                },
                pais: true,
                bi: true,
                titulopropriedade: {
                    include: {
                        viatura: {
                            include: {
                                marca: true,
                                titulopropriedade: {
                                    include: {
                                        pessoa: {
                                            include: {
                                                automobilista: true,
                                            },
                                        },
                                    },
                                },
                                alertaroubo: {
                                    include: {
                                        tiporoubo: true,
                                        endereco: {
                                            include: {
                                                municipio: {
                                                    include: {
                                                        provincia: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (pessoa) {
            res.status(200).json(pessoa);
        } else {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a pessoa' });
    }
};

export const createPessoa = async (req: Request, res: Response): Promise<void> => {
    const {
        codEndereco,
        codNacionalidade,
        codContacto,
        nome,
        genero,
        estadoCivil,
        dataCadastro,
        dataNascimento,
        codBi,
        senha,
    } = req.body;

    try {
        const newPessoa = await prisma.pessoa.create({
            data: {
                codEndereco: codEndereco ? Number(codEndereco) : undefined,
                codNacionalidade: codNacionalidade ? Number(codNacionalidade) : undefined,
                codContacto: codContacto ? Number(codContacto) : undefined,
                nome,
                genero,
                estadoCivil,
                dataCadastro,
                dataNascimento,
                codBi: Number(codBi),
                senha,
            },
            include: {
                automobilista: true,
                funcionario: true,
                contacto: true,
                endereco: true,
                pais: true,
                bi: true,
                titulopropriedade: true,
            },
        });
        res.status(201).json(newPessoa);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a pessoa' });
    }
};

export const updatePessoa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        codEndereco,
        codNacionalidade,
        codContacto,
        nome,
        genero,
        estadoCivil,
        dataCadastro,
        dataNascimento,
        codBi,
        senha,
    } = req.body;

    try {
        const updatedPessoa = await prisma.pessoa.update({
            where: { codPessoa: Number(id) },
            data: {
                codEndereco: codEndereco ? Number(codEndereco) : undefined,
                codNacionalidade: codNacionalidade ? Number(codNacionalidade) : undefined,
                codContacto: codContacto ? Number(codContacto) : undefined,
                nome,
                genero,
                estadoCivil,
                dataCadastro,
                dataNascimento,
                codBi: Number(codBi),
                senha,
            },
            include: {
                automobilista: true,
                funcionario: true,
                contacto: true,
                endereco: true,
                pais: true,
                bi: true,
                titulopropriedade: true,
            },
        });
        res.status(200).json(updatedPessoa);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a pessoa' });
    }
};

export const deletePessoa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.pessoa.delete({
            where: { codPessoa: Number(id) },
        });
        res.status(200).json({ message: 'Pessoa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a pessoa' });
    }
};
