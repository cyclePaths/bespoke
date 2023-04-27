import { Router } from 'express';
import { PrismaClient, Prisma, User } from '@prisma/client';
import axios from 'axios';

// Request Handlers //
const BikeRoutes = Router();
const prisma = new PrismaClient();

// Types for typescript //
type NewBikeRoute = Prisma.BikeRoutesCreateInput & {
  origin: [number, number];
  destination: [number, number];
  user: { connect: { id: number } };
};

// End of typescript types //

// Creates new bike route with POST //
/// Only good for point A to point B ///
BikeRoutes.post('/newRoute', (req, res) => {
  const { directions, user, name, category, privacy } = req.body;
  const id = user.id;
  const originLat: number = directions.request.origin.location.lat;
  const originLng: number = directions.request.origin.location.lng;
  const destinationLat: number = directions.request.destination.location.lat;
  const destinationLng: number = directions.request.destination.location.lng;

  const newBikeRoute: NewBikeRoute = {
    origin: [originLat, originLng],
    destination: [destinationLat, destinationLng],
    user: { connect: { id: id } },
    name: name,
    category: category,
    isPrivate: privacy,
    createdAt: new Date(),
  };

  prisma.bikeRoutes
    .create({ data: newBikeRoute })
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Failed to handle:', err);
      res.sendStatus(500);
    });
});

BikeRoutes.get('/routes/:id', (req, res) => {
  const { id } = req.params;

  prisma.user
    .findUnique({
      where: { id: parseInt(id) },
      include: { createdRoutes: true },
    })
    .then((user) => {
      res.status(200).send(user!.createdRoutes);
    })
    .catch((err) => {
      console.error('Cannot resolve GET:', err);
      res.sendStatus(500);
    });
});

// Retrieve the reports from the server
BikeRoutes.get('/reports', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const reportsList = await prisma.report.findMany({
      where: {
        location_lat: {
          gte: parseFloat(lat as string) - 0.01,
          lte: parseFloat(lat as string) + 0.01,
        },
        location_lng: {
          gte: parseFloat(lng as string) - 0.01,
          lte: parseFloat(lng as string) + 0.01,
        },
      },
      include: {
        comments: true,
      },
    });

    if (reportsList.length < 1) {
      res.sendStatus(404);
    } else {
      res.status(200).send(reportsList);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Handler to fetch all the public routes or the user's routes //
BikeRoutes.get('/routes', async (req, res) => {
  const { privacy, category } = req.query;
  const { id } = req.user as User;

  if (privacy === 'false') {
    try {
      const publicRoutes = await prisma.bikeRoutes.findMany({
        where: {
          category: category as string,
          isPrivate: JSON.parse(privacy),
        },
      });
      res.status(200).send(publicRoutes);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else if (privacy === 'true') {
    try {
      const userRoutes = await prisma.user.findMany({
        where: {
          id: id,
        },
        include: {
          createdRoutes: true,
        },
      });
      res.status(200).send(userRoutes[0].createdRoutes);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
});

BikeRoutes.get('/likes', (req, res) => {});

export default BikeRoutes;
