import express, { Router } from 'express';
import axios from 'axios';
import { PrismaClient, User, DirectMessages } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const dmRouter: Router = express.Router();

dmRouter.post('/message', async (req: Request, res: Response) => {
  console.log(req.body);
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