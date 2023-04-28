import express, { Router } from 'express';
import axios from 'axios';
import { PrismaClient, User, Rides } from '@prisma/client';
import { Request, Response } from 'express';
import { CALORIES_BURNED_API } from '../../config';

const prisma = new PrismaClient();
const profileRouter: Router = express.Router();

let calories = 0;

profileRouter.post('/theme', async (req: Request, res: Response) => {
  try {
    const newTheme = req.body.theme;
    const {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    } = (req.user as User) || {};

    const userData: User = {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    };

    const updateTheme = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        theme: newTheme,
      },
      create: {
        ...userData,
        theme: newTheme,
      },
    });
    res.status(201).send(updateTheme);
  } catch (err) {
    console.log('Failed to update weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/user', async (req: Request, res: Response) => {
  // console.log(req.user, 'query');
  try {
    const { id } = (req.user as User) || {};
    const nameValue = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(nameValue);
  } catch (err) {
    console.log('Failed to get weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/workout', (req: Request, res: Response) => {
  const { activity, duration, weight } = req.query;

  const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/caloriesburned',
    params: { activity: activity, duration: duration, weight: weight },
    headers: {
      'X-Api-Key': CALORIES_BURNED_API,
    },
  };

  axios
    .request(options)
    .then(function ({ data }) {
      calories = data[0].total_calories;
      res.status(200).send(data[0]);
    })
    .catch(function (error) {
      console.error('EMOTIONAL DAAAAMAGE');
      res.sendStatus(500);
    });
});

profileRouter.post('/workout', async (req, res) => {
  try {
    const { activity, duration, weight, calories } = req.body;

    const { id } = req.user as User;

    const rideData: Rides = {
      id,
      activity,
      duration,
      weight,
      calories,
      userId: id,
    };
    const newRide = await prisma.rides.create({
      data: {
        activity,
        duration,
        weight,
        calories,
        userId: id,
      },
    });
    res.status(201).send(newRide);
  } catch (err) {
    console.log('Failed to update ride', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/lastRide', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    const lastRide = await prisma.rides.findFirst({
      where: {
        userId: id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    res.status(200).send(lastRide);
  } catch (err) {
    console.log('Failed to get weight', err);
    res.sendStatus(500);
  }
});

// Creates new user weight with POST. Updates any current weight value //
profileRouter.post('/weight', async (req: Request, res: Response) => {
  try {
    const newWeight = req.body.weight;
    const {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    } = (req.user as User) || {};

    const userData: User = {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    };

    const updateWeight = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        weight: newWeight,
      },
      create: {
        ...userData,
        weight: newWeight,
      },
    });
    res.status(201).send(updateWeight);
  } catch (err) {
    console.log('Failed to update weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/weight', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    const weightValue = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(weightValue);
  } catch (err) {
    console.log('Failed to get weight', err);
    res.sendStatus(500);
  }
});

profileRouter.post('/address', async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    const {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    } = (req.user as User) || {};

    const userData: User = {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      location_lat,
      location_lng,
      theme,
      homeAddress,
      totalMiles,
      totalPosts,
      joinDate,
      lastLoginDate,
      firstRideCity,
      firstRideCountry,
      monthlyMiles,
      ridesThisWeek,
      totalReports,
      monthlyDownvotedReports,
      totalRoutes,
      totalLikesReceived,
    };

    const updateAddress = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        homeAddress: address,
      },
      create: {
        ...userData,
        homeAddress: address,
      },
    });
    res.status(201).send(updateAddress);
  } catch (err) {
    console.log('Failed to update address', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/address', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    const address = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(address);
  } catch (err) {
    console.log('Failed to get address', err);
    res.sendStatus(500);
  }
});

export default profileRouter;
