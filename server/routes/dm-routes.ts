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


dmRouter.get('/retrieveNotificationMessages', async (req: Request, res: Response) => {
  // console.log('query', req.query);
  // console.log('user', req.user);
  // console.log('senderId', req.query.senderId)
  try {
    const { senderId } = req.query;
    const { id } = req.user as { id: number };



    const conversation = await prisma.directMessages.findMany({
      where: {
        OR: [
          { senderId: Number(senderId), receiverId: id },
          { senderId: id, receiverId: Number(senderId) },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    // console.log('conversation', conversation)
    res.status(200).send(conversation);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});




dmRouter.get('/conversations', async (req: Request, res: Response) => {
  // console.log(req)
  try {
    const { id } = req.user as { id: number };

    // Get all conversations where the user is either the sender or the receiver
    const conversations = await prisma.directMessages.findMany({
      where: {
        OR: [{ senderId: id }, { receiverId: id }],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Create a map to store the most recent message of each conversation
    const lastMessages = new Map();

    conversations.forEach((message) => {
      const otherUserId = message.senderId === id ? message.receiverId : message.senderId;

      // If the conversation with the other user is not yet in the map, or the current message is more recent,
      // update the map
      if (!lastMessages.has(otherUserId) || lastMessages.get(otherUserId).createdAt < message.createdAt) {
        lastMessages.set(otherUserId, message);
      }
    });

    // Convert the map to an array
    const lastMessagesArray = Array.from(lastMessages.values());


    res.status(200).send(lastMessagesArray);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});



dmRouter.post('/message', async (req: Request, res: Response) => {
  // console.log(req.user);
  try {
    const { receiverId, receiverName, text, fromMe } = req.body.message;

    // const { name } = req.user;

    const { id, name } = req.user as User;

    const newMessage = await prisma.directMessages.create({
      data: {
        senderId: id,
        senderName: name,
        receiverId: receiverId,
        receiverName: receiverName,
        text: text,
        fromMe: Boolean(fromMe),
      },
    });
    res.status(201).send(newMessage);
  } catch (err) {
    console.error('failed', err);
    res.sendStatus(500);
  }
});

export default dmRouter;
