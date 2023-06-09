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

bulletinRouter.get('/randomPost', (req, res) => {
  prisma.bulletin
    .findMany({})
    .then((result) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else {
        const randomPost = Math.floor(Math.random() * result.length);
        res.status(200).send(result[randomPost]);
      }
    })
    .catch((err) => {
      console.error('Failed to find Posts: ', err);
      res.sendStatus(500);
    });
});

//DELETE bulletin from database - DeleteBulletin.tsx
bulletinRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  prisma.bulletin
    .delete({ where: { id: parseInt(id) } })
    .then(() => res.sendStatus(203)
     )
     .catch((error) => {
      console.log(error, 'bulletin DELETE error')
      res.sendStatus(500)
     })
    })




export default bulletinRouter;
