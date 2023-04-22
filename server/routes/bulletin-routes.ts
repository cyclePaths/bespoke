import { Router } from 'express';
import { PrismaClient, Bulletin  } from '@prisma/client';

const bulletinRouter = Router()
const prisma = new PrismaClient()

interface CreateBulletin {
    topic: string;
    creator: string;
    text: string;
    createdAt: Date
  }


// GET bulletins from database - BulletinBoard.tsx
bulletinRouter.get('/bulletins', (req, res) => {
    prisma.bulletin.findMany()
    .then((bulletins) => res.status(200).send(bulletins))
    .catch(() => {
        console.log('Failed to GET bulletins')
        res.sendStatus(500)
    })
});

// POST bulletin to database - BulletinBoard.tsx
bulletinRouter.post('/bulletins', (req, res) => {
    const { topic, creator, text, createdAt } = req.body
    const newBulletin: CreateBulletin = {
        topic: topic,
        creator: creator,
        text: text,
        createdAt: new Date()
    };
    prisma.bulletin.create({ data: newBulletin })
    .then (() => res.sendStatus(201))
    .catch(() => {
        console.log('Failed to POST new bulletin')
        res.sendStatus(500)
    })
});









