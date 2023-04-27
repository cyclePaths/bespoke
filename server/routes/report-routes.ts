import express, { Router } from 'express';
// const router: Router = express.Router();
const reportRouter = express.Router();
import { PrismaClient, Report } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';
import { Request, Response } from 'express';
const cloudinary = require('cloudinary').v2;

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

//  POST a new Report
reportRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
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

// reportRouter.post('/reports', async (req, res) => {
//   console.log("res:", res);
  // try {
  //   const { body, type, title, latitude, longitude, image } = req.body;

  //   const formData = new FormData();
  //   formData.append('body', body);
  //   formData.append('type', type);
  //   formData.append('title', title);
  //   formData.append('latitude', latitude);
  //   formData.append('longitude', longitude);

  //   let imageUrl: string | undefined;
  //   if (image) {
  //     // Upload image to Cloudinary
  //     const uniqueFilename = uuidv4();
  //     const formDataWithImage = new FormData();
  //     formDataWithImage.append('file', image);
  //     formDataWithImage.append('upload_preset', '<your_cloudinary_upload_preset>');
  //     formDataWithImage.append('public_id', uniqueFilename);
  //     const response = await axios.post(
  //       'https://api.cloudinary.com/v1_1/<your_cloudinary_cloud_name>/image/upload',
  //       formDataWithImage,
  //     );
  //     imageUrl = response.data.secure_url;
  //   } else {
  //     imageUrl = undefined;
  //   }

  //   const reportData: Omit<Report, 'id'> = {
  //     body,
  //     type,
  //     title,
  //     location_lat: Number(latitude),
  //     location_lng: Number(longitude),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     published: true,
  //     userId: req.user.id,
  //     imgUrl: imageUrl,
  //   };

  //   // Save report data to database using Prisma
  //   const newReport = await prisma.report.create({ data: reportData });

  //   res.json(newReport);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'An error occurred while saving the report.' });
  // }
// });


// reportRouter.post('/createMany', async (req, res) => {
//   try {
//     const data = req.body;
//     const newPosts = await prisma.report.createMany({
//       data,
//     });
//     res.status(201).json(newPosts);
//     console.log("Success")
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


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
      }
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
