import { Router } from 'express';
import { PrismaClient, Prisma, User, BikeRoutes } from '@prisma/client';
import axios from 'axios';
import { Decimal } from '@prisma/client/runtime';
import { ThemeContext } from '@emotion/react';

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
  const { id, location_lat, location_lng } = req.user as User;

  if (privacy === 'false') {
    prisma.bikeRoutes
      .findMany({
        where: {
          category: category as string,
          isPrivate: JSON.parse(privacy),
        },
      })
      .then((routeList) => {
        const radiusRoutes: BikeRoutes[] = [];
        routeList.forEach((route) => {
          const gteLat = location_lat! - 0.1;
          const lteLat = location_lat! + 0.1;
          const gteLng = location_lng! - 0.1;
          const lteLng = location_lng! + 0.1;

          if (
            (route.origin[0] as unknown as number) >= gteLat &&
            (route.origin[0] as unknown as number) <= lteLat &&
            (route.origin[1] as unknown as number) >= gteLng &&
            (route.origin[1] as unknown as number) <= lteLng
          ) {
            radiusRoutes.push(route);
          }
        });
        res.status(200).send(radiusRoutes);
      })
      .catch((err) => {
        console.error('Failed to fetch: ', err);
      });
  } else if (privacy === 'true') {
    prisma.user
      .findMany({
        where: {
          id: id,
        },
        include: {
          createdRoutes: true,
        },
      })
      .then((user) => {
        const list = user[0].createdRoutes;
        res.status(200).send(list);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

BikeRoutes.get('/likes', (req, res) => {});

export default BikeRoutes;
