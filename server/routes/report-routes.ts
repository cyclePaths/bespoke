import express, { Router } from 'express';
// const router: Router = express.Router();
const reportRouter = express.Router();
import { PrismaClient, Report, User } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
const cloudinary = require('cloudinary').v2;
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
const path = require('path');
import fs from 'fs';

//  cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
  const id = req.params.id;
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

//  create file storage "engine"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    console.log();
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// reportRouter.post('/',  (req, res) => {

//     console.log(req);

// });
reportRouter.post(
  '/',
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Multer Error: ', err);
        return res
          .status(400)
          .json({ error: 'An error occurred while uploading the image.' });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { userId, body, type, title, latitude, longitude } = req.body;
      let imageUrl: string | undefined;

      // Check if file exists in the request and upload it to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
        // Delete the local image file after it has been uploaded to Cloudinary
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error deleting the local image file:', err);
          }
        });
      }
      // console.log(req.user);
      const { id } = req.user as User;

      // Save report data to database using Prisma
      const newReport = await prisma.report.create({
        data: {
          body: body,
          type: type,
          title: title,
          location_lat: Number(latitude),
          location_lng: Number(longitude),
          createdAt: new Date(),
          updatedAt: new Date(),
          published: true,
          author: {
            connect: {
              id: id,
            },
          },
          imgUrl: imageUrl ?? null,
        },
      });
      res.sendStatus(201);
    } catch (error) {
      console.error('Report Post Error: ', error);
      res
        .status(500)
        .json({ error: 'An error occurred while saving the report.' });
    }
  }
);

//  UPDATE report archived only
reportRouter.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { published } = req.body!;
  try {
    const post = await prisma.report.update({
      where: {
        id: id,
      },
      data: {
        published: published,
      },
    });
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ error: 'Report not found!' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// reportRouter.patch('/publish', async (req: Request, res: Response) => {

//   try {
//     const updatedReports = await prisma.report.updateMany({
//       where: {
//         userId: 1,
//       },
//       data: {
//         published: true,
//       },
//     });
//     res.status(200).json({ message: `${updatedReports.count} reports updated` });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

//  DELETE a report by ID
// reportRouter.delete('/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deletedPost = await prisma.report.delete({
//       where: {
//         id: id,
//       },
//     });
//     if (deletedPost) {
//       res.status(200).json({ message: `Post: ${id} deleted` });
//     } else {
//       res.status(404).json({ error: `Post: ${id} not found` });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

reportRouter.delete('/deleteAll', async (req, res) => {
  try {
    await prisma.report.deleteMany({});
    res.status(200).json({ message: 'All reports deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default reportRouter;
