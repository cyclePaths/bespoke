
import express, { Router } from 'express';
// const router: Router = express.Router();
const reportRouter = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';

//  routes to our DB
reportRouter.get('/', (req, res) => {
  res.json({mssg: "GET all reports"})
});
reportRouter.post('/', async (req, res) => {
    try {
      const { body, type, title } = req.body;
      const newPost = await prisma.report.create({
        data: {
          body,
          type,
          title
        },
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  export default reportRouter

