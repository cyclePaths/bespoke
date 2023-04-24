import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const bulletinRouter = Router()
const commentRouter = Router()
const prisma = new PrismaClient()

interface CreateBulletin {
    topic: string;
    creator: string;
    text: string;
    createdAt: Date
  }

  interface CreateComment {
    bulletinOrigin: number;
    commentCreator: string;
    commentText: string;
    createdAt: Date
  }


// GET bulletins from database - BulletinBoard.tsx
bulletinRouter.get('/', (req, res) => {
    prisma.bulletin.findMany()
    .then((bulletins) => res.status(200).send(bulletins))
    .catch(() => {
        console.log('Failed to GET BULLETINS')
        res.sendStatus(500)
    })
});

// POST bulletin to database - CreateBulletin.tsx
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
        console.log('Failed to POST new BULLETIN')
        res.sendStatus(500)
    })
});

//POST comment to database - CreateComment.tsx
commentRouter.post('/', (req, res) => {
    const { bulletinOrigin, commentCreator, commentText } = req.body;
    const newComment: CreateComment = {
        bulletinOrigin: bulletinOrigin,
        commentCreator: commentCreator,
        commentText: commentText,
        createdAt: new Date()
    };
    prisma.comment.create({ data: newComment })
    .then ((comment) => res.status(201).send(comment))
    .catch(() => {
        console.log('Failed to POST new COMMENT')
        res.sendStatus(500)
    })
});

export { bulletinRouter, commentRouter };










