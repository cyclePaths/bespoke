import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const bulletinRouter = Router();
const prisma = new PrismaClient();

interface CreateBulletin {
  topic: string;
  creator: string;
  text: string;
  createdAt: Date;
}

// GET bulletins from database - BulletinBoard.tsx
bulletinRouter.get('/', (req, res) => {
  prisma.bulletin
    .findMany()
    .then((bulletins) => res.status(200).send(bulletins))
    .catch(() => {
      console.error('Failed to GET BULLETINS');
      res.sendStatus(500);
    });
});

// POST bulletin to database - CreateBulletin.tsx
bulletinRouter.post('/', (req, res) => {
  const { topic, creator, text } = req.body;
  const newBulletin: CreateBulletin = {
    topic: topic,
    creator: creator,
    text: text,
    createdAt: new Date(),
  };
  prisma.bulletin
    .create({ data: newBulletin })
    .then((bulletin) => res.status(201).send(bulletin))
    .catch(() => {
      console.error('Failed to POST new BULLETIN');
      res.sendStatus(500);
    });
});

export default bulletinRouter;
