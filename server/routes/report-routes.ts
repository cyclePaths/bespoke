import express, { Router } from 'express';
// const router: Router = express.Router();
const reportRouter = express.Router();
import { PrismaClient, Report } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';
import { Request, Response } from 'express';

// GET ALL REPORTS
reportRouter.get('/', async (req, res) => {
  try {
    const posts = await prisma.report.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET BY ID
reportRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.report.findUnique({
      where: {
        id: id,
      },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Report not found!' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//  POST a new Report
reportRouter.post('/', async (req, res) => {
  try {
    const { id, body, type, title, location_lat, location_lng } = req.body;
    const data: Omit<Report, "id"> = {
      body,
      type,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false,
      location_lat,
      location_lng,
    };
    const newPost = await prisma.report.create({
      data,
    });
    res.status(201).json(newPost);
    console.log("Success")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//  DELETE a report by ID
reportRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deletedPost = await prisma.report.delete({
      where: {
        id: id,
      },
    });
    if (deletedPost) {
      res.status(200).json({ message: `Post: ${id} deleted` });
    } else {
      res.status(404).json({ error: `Post: ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default reportRouter;
