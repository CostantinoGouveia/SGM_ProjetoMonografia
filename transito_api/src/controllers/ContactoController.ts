// src/controllers/ContactoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContactos = async (req: Request, res: Response): Promise<void> => {
    const contactos = await prisma.contacto.findMany({
        include: {
            pessoa: true
        }
    });
    res.status(200).json(contactos);
};

export const getContactoById = async (req: Request, res: Response): Promise<void> => {
    const contacto = await prisma.contacto.findUnique({
        where: { idContacto: Number(req.params.id) },
        include: {
            pessoa: true
        }
    });

    if (contacto) {
        res.status(200).json(contacto);
    } else {
        res.status(404).json({ message: 'Contacto não encontrado' });
    }
};

export const createContacto = async (req: Request, res: Response): Promise<void> => {
    const { contacto1, contacto2, email1, email2, pessoa } = req.body;
    const newContacto = await prisma.contacto.create({
        data: {
            contacto1,
            contacto2,
            email1,
            email2,
            pessoa: { connect: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(201).json(newContacto);
};

export const updateContacto = async (req: Request, res: Response): Promise<void> => {
    const { contacto1, contacto2, email1, email2, pessoa } = req.body;
    const updatedContacto = await prisma.contacto.update({
        where: { idContacto: Number(req.params.id) },
        data: {
            contacto1,
            contacto2,
            email1,
            email2,
            pessoa: { set: pessoa.map((p: { idPessoa: number }) => ({ idPessoa: p.idPessoa })) }
        }
    });
    res.status(200).json(updatedContacto);
};

export const deleteContacto = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.contacto.delete({ where: { idContacto: Number(req.params.id) } });
        res.status(200).json({ message: 'Contacto deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Contacto não encontrado' });
    }
};
