import express, { Router } from 'express';
import axios from 'axios';
import { PrismaClient, User, DirectMessages } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const dmRouter: Router = express.Router();

dmRouter.get(`/findUsers`, async(req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = (req.user as User) || {};
    const allUsers = await prisma.user.findMany();
    console.log(allUsers)
    res.status(200).send(allUsers);
  } catch (err) {
    console.log('Failed to get weight', err);
    res.sendStatus(500);
  }
})



dmRouter.get(`/:`, (req: Request, res: Response) => {
  console.log(req.body);
  // try {
  //   const { name } = req.body;

  //   // const { id } = req.user as User;

  //   const userMessageData: DirectMessages = {
  //     id,
  //     senderId: id,
  //     // receiverId,
  //     content,
  //     // createdAt,
  //     // updatedAt,

  //   }


  // } catch {}
})

dmRouter.post('/message', async (req: Request, res: Response) => {
  console.log(req);
  // try {
  //   const { content, fromMe } = req.body.message;

  //   const { id } = req.user as User;

  //   const messageData: DirectMessages = {
  //     id,
  //     senderId: id,
  //     // receiverId,
  //     content,
  //     // createdAt,
  //     // updatedAt,

  //   }


  // } catch {}
})






export default dmRouter;