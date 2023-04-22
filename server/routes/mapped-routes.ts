import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
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
  const { directions, user } = req.body;
  const { id } = user;
  const originLat: number = directions.request.origin.location.lat;
  const originLng: number = directions.request.origin.location.lng;
  const destinationLat: number = directions.request.destination.location.lat;
  const destinationLng: number = directions.request.destination.location.lng;

  const newBikeRoute: NewBikeRoute = {
    origin: [originLat, originLng],
    destination: [destinationLat, destinationLng],
    user: { connect: { id: id } },
  };

  prisma.bikeRoutes
    .create({ data: newBikeRoute })
    .then(() => {
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

export default BikeRoutes;
