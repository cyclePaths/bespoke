import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const commentRouter = Router();
const prisma = new PrismaClient();

interface CreateComment {
  bulletinOrigin: number;
  commentCreator: string;
  commentText: string;
  createdAt: Date;
}

// GET comments from database - BulletinBoard.tsx
commentRouter.get('/', (req, res) => {
  prisma.comment
    .findMany()
    .then((comments) => res.status(200).send(comments))
    .catch(() => {
      console.error('Failed to GET COMMENTS');
      res.sendStatus(500);
    });
});

//POST comment to database - CreateComment.tsx
commentRouter.post('/', (req, res) => {
  const { bulletinOrigin, commentCreator, commentText } = req.body;
  const newComment: CreateComment = {
    bulletinOrigin: bulletinOrigin,
    commentCreator: commentCreator,
    commentText: commentText,
    createdAt: new Date(),
  };
  prisma.comment
    .create({ data: newComment })
    .then((comment) => res.status(201).send(comment))
    .catch(() => {
      console.loerrorg('Failed to POST new COMMENT');
      res.sendStatus(500);
    });
});

export default commentRouter;
