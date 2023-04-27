import { PrismaClient, User } from '@prisma/client';
import { Router } from 'express';

const LeaderBoard = Router();
const prisma = new PrismaClient();

interface UserTopTrait {
  name: string;
  value: number;
}

// Fetches top 10 users in total likes //
LeaderBoard.get('/likes', (req, res) => {
  prisma.user
    .findMany({
      orderBy: {
        totalLikesReceived: 'desc',
      },
      take: 10,
    })
    .then((list) => {
      const userList: UserTopTrait[] = [];
      for (let i = 0; i < list.length; i++) {
        const userNameandLikes = {
          name: list[i].name,
          value: list[i].totalLikesReceived,
        };
        userList.push(userNameandLikes);
      }
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.error('Failed request: ', err);
      res.sendStatus(500);
    });
});

// // Fetches top 10 users in miles traveled //
LeaderBoard.get('/travelMiles', async (req, res) => {
  prisma.user
    .findMany({
      orderBy: {
        totalMiles: 'desc',
      },
      take: 10,
    })
    .then((list) => {
      const userList: UserTopTrait[] = [];
      for (let i = 0; i < list.length; i++) {
        const userNameandMiles = {
          name: list[i].name,
          value: list[i].totalMiles,
        };
        userList.push(userNameandMiles);
      }
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.error('Failed request: ', err);
      res.sendStatus(500);
    });
});

// // Fetches top 10 user in Post on the bulletin //
LeaderBoard.get('/totalPosts', async (req, res) => {
  prisma.user
    .findMany({
      orderBy: {
        totalPosts: 'desc',
      },
      take: 10,
    })
    .then((list) => {
      const userList: UserTopTrait[] = [];
      for (let i = 0; i < list.length; i++) {
        const userNameandPost = {
          name: list[i].name,
          value: list[i].totalPosts,
        };
        userList.push(userNameandPost);
      }
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.error('Failed request: ', err);
      res.sendStatus(500);
    });
});

// // Fetches top 10 users on creating reports //
LeaderBoard.get('/reports', async (req, res) => {
  prisma.user
    .findMany({
      orderBy: {
        totalReports: 'desc',
      },
      take: 10,
    })
    .then((list) => {
      const userList: UserTopTrait[] = [];
      for (let i = 0; i < list.length; i++) {
        const userNameandReports = {
          name: list[i].name,
          value: list[i].totalReports,
        };
        userList.push(userNameandReports);
      }
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.error('Failed request: ', err);
      res.sendStatus(500);
    });
});

// // Fetches top 10 users on creating routes //
LeaderBoard.get('/bikeRoutes', async (req, res) => {
  prisma.user
    .findMany({
      orderBy: {
        totalRoutes: 'desc',
      },
      take: 10,
    })
    .then((list) => {
      const userList: UserTopTrait[] = [];
      for (let i = 0; i < list.length; i++) {
        const userNameandRoutes = {
          name: list[i].name,
          value: list[i].totalRoutes,
        };
        userList.push(userNameandRoutes);
      }
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.error('Failed request: ', err);
      res.sendStatus(500);
    });
});

export default LeaderBoard;
