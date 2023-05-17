import express, { Router } from 'express';
import axios from 'axios';
import { Prisma, PrismaClient, User, Rides } from '@prisma/client';
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
      recentRouteId,
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
      selectedBadge,
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
      recentRouteId,
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
      selectedBadge,
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
    console.error('Failed to update weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/user', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    const nameValue = await prisma.user.findUnique({
      where: {
        id: id,
      },

    });
    res.status(200).send(nameValue);
  } catch (err) {
    console.error('Failed to get weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/workout', (req: Request, res: Response) => {
  console.log('querey', req.query)
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

    // const rideData: Rides = {
    //   id,
    //   activity,
    //   duration,
    //   weight,
    //   calories,
    //   userId: id,
    // };
    const newRide = await prisma.rides.create({
      data: {
        activity,
        duration,
        weight,
        calories,
        userId: Number(id),
      },
    });
    res.status(201).send(newRide);
  } catch (err) {
    console.error('Failed to update ride', err);
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
    console.error('Failed to get weight', err);
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
      recentRouteId,
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
      selectedBadge,
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
      recentRouteId,
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
      selectedBadge,
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
    console.error('Failed to update weight', err);
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
      select: {
        weight: true,
      },
    });

    res.status(200).send(weightValue);
  } catch (err) {
    console.error('Failed to get weight', err);
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
      recentRouteId,
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
      selectedBadge,
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
      recentRouteId,
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
      selectedBadge,
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
    console.error('Failed to update address', err);
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
      select: {
        homeAddress: true,
      }
    });
    res.status(200).send(address);
  } catch (err) {
    console.error('Failed to get address', err);
    res.sendStatus(500);
  }
});


profileRouter.get('/stats', async (req: Request, res: Response) => {
  // console.log(req.query)
  try {
    const { id } = req.user as { id: number };
    const speed = typeof req.query.speed === 'string' ? req.query.speed : undefined;
    // if (!speed) {
    //   return res.status(400).json({ error: 'Invalid speed value' });
    // }

    const statsData = await prisma.rides.findMany({
      where: {
        // AND: [
           userId: id ,
           activity: speed,
        // ]
      },
      select: {
        id: true,
        activity: true,
        duration: true,
        weight: true,
        calories: true,
      }

    });
    // console.log('statsData', statsData)
    res.status(200).json(statsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


profileRouter.delete('/deleteStat/:id', async(req: Request, res: Response) => {
  // console.log(req)
  try {
    const { id } = req.params as { id?: number };

    const deleteRide = await prisma.rides.delete({
      where: {
        id: Number(id),
      }
    });
    console.log('success')
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
})


profileRouter.delete('/deleteAddress/:id', async(req: Request, res: Response) => {
  console.log(req)
  try {
    const { id } = req.params as { id?: number };

    const deleteAddress = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        homeAddress: null,
      } as Prisma.UserUpdateInput,
    });
    console.log('success')
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
})


profileRouter.delete('/deleteWeight/:id', async(req: Request, res: Response) => {
  console.log(req)
  try {
    const { id } = req.params as { id?: number };

    const deleteWeight = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        weight: null,
      } as Prisma.UserUpdateInput,
    });
    console.log('success')
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
})


export default profileRouter;
