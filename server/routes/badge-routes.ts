import { Router, Request, Response } from 'express';
import { PrismaClient, User, Badge, BadgesOnUsers } from '@prisma/client';
import { badgesSeed } from '../server-assets';
const badgeRouter = Router();
const prisma = new PrismaClient();

badgeRouter.patch('/counter', async (req: Request, res: Response) => {
  try {
    const { userId, key, change } = req.body;
    let user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    let currentValue = 0;
    if (!user) {
      console.error('an error occurred trying to find user with id ', userId);
    } else {
      currentValue = user[key];
    }
    let dataObj = {};
    dataObj[key] = currentValue + change; //this should actually be 'current value' + change; need add a method to find the current value of this key!
    const updateCounter = await prisma.user.update({
      where: {
        id: userId,
      },
      data: dataObj,
    });
    res.status(200).send(updateCounter);
  } catch (err) {
    console.error(
      `an error occurred when attempting to update ${req.body.key}`,
      err
    );
    res.sendStatus(500);
  }
});

//seeder function

async function seedBadges() {
  for (let i = 0; i < badgesSeed.length; i++) {
    const badge = await prisma.badge.create({
      data: {
        name: badgesSeed[i].name,
        badgeIcon: badgesSeed[i].badgeIcon,
      },
    });
  }
}

seedBadges()
  .catch((err) => console.error('an error occurred when seeding Badges: ', err))
  .finally(() => prisma.$disconnect()); //unsure if this part is necessary?

export { badgeRouter };
