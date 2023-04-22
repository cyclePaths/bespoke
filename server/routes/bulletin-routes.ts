import express, { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const bulletinRouter = Router()
const prisma = new PrismaClient()

interface CreateBulletin {
    topic: string;
    creator: string;
    text: string;
    createdAt: Date
  }


// GET bulletins from database - BulletinBoard.tsx
bulletinRouter.get('/bulletin', (req, res) => {
    prisma.bulletin.findMany()
    .then((bulletins) => res.status(200).send(bulletins))
    .catch(() => {
        console.log('Failed to GET bulletins')
        res.sendStatus(500)
    })
});

// POST bulletin to database - BulletinBoard.tsx
bulletinRouter.post('/', (req, res) => {
    const { topic, creator, text } = req.body
    const newBulletin: CreateBulletin = {
        topic: topic,
        creator: creator,
        text: text,
        createdAt: new Date()
    };
    prisma.bulletin.create({ data: newBulletin })
    .then ((bulletin) => res.status(201).send(bulletin))
    .catch(() => {
        console.log('Failed to POST new bulletin')
        res.sendStatus(500)
    })
});

export default bulletinRouter









