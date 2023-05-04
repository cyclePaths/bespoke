import express, { Router } from 'express';
import axios from 'axios';
import { PrismaClient, User, DirectMessages } from '@prisma/client';
import { Request, Response } from 'express';
import socketIO, { Server, Socket } from 'socket.io';
import http, { IncomingMessage } from 'http';
import { io } from '../index';

const prisma = new PrismaClient();
const dmRouter: Router = express.Router();

interface CustomSocket extends Socket {
  request: IncomingMessage & {
    user?: User;
  };
}

interface NewMessage {
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  text: string;
  fromMe: boolean;
}


dmRouter.get(`/findUsers`, async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    // const { id } = (req.user as User) || {};
    const allUsers = await prisma.user.findMany();
    // console.log(allUsers)
    res.status(200).send(allUsers);
  } catch (err) {
    console.error('Failed to get weight', err);
    res.sendStatus(500);
  }
});

dmRouter.get('/retrieveMessages', async (req: Request, res: Response) => {
  // console.log(req);
  try {
    const { receiverId } = req.query;
    const { id } = req.user as { id: number };

    const conversation = await prisma.directMessages.findMany({
      where: {
        OR: [
          { receiverId: Number(receiverId), senderId: id },
          { receiverId: id, senderId: Number(receiverId) },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    res.status(200).send(conversation);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

dmRouter.get('/conversations', async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: number };

    const conversations = await prisma.directMessages.findMany({
      where: {
        OR: [
          { senderId: id },
          { receiverId: id },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      }
    })
    res.status(200).send(conversations);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})


dmRouter.post('/message', async (req: Request, res: Response) => {
  console.log(req);
  try {
    const { receiverId, receiverName, name, text, fromMe } = req.body.message;

    const { id } = req.user as User;

    const newMessage = await prisma.directMessages.create({
      data: {
        senderId: id,
        senderName: name,
        receiverId: receiverId,
        receiverName: receiverName,
        text: text,
        fromMe: fromMe,
      },
    });

    console.error('New message created:', newMessage);

      // Emit a 'message' event to all connected clients except the sender
      const socket = Array.from(io.sockets.sockets.values()).find(
        (socket: CustomSocket) => socket.request.user?.id === Number(receiverId)
      );
      if (socket) {
        socket.emit('message', newMessage);
      }

  } catch {
    res.sendStatus(500);
  }
});

export default dmRouter;
