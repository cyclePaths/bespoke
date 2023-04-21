import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import axios from 'axios';

// Request Handlers //
const BikeRoutes = Router();
const prisma = new PrismaClient();

// Types for typescript //
type NewBikeRoute = Prisma.BikeRoutesCreateInput & {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  user: { connect: { id: number } };
};

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
    startLat: originLat,
    startLng: originLng,
    endLat: destinationLat,
    endLng: destinationLng,
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

export default BikeRoutes;
