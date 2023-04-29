import { Router, Request, Response } from 'express';
import {
  Prisma,
  PrismaClient,
  User,
  Badge,
  BadgesOnUsers,
} from '@prisma/client';
import { badgesSeed } from '../server-assets';
const badgeRouter = Router();
const prisma = new PrismaClient();

// interface BadgeOnUserWithTier extends Prisma.BadgesOnUsers {
//   tier: number | null;
// }

badgeRouter.post('/tier', async (req: Request, res: Response) => {
  const { badgeId, userId, tiers } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    console.error(`could not find user with id ${userId}`);
    res.sendStatus(500);
  }
  const badge = await prisma.badge.findUnique({
    where: {
      id: badgeId,
    },
  });
  if (!badge) {
    console.error(`could not find badge with id ${badgeId}`);
    res.sendStatus(500);
  }
  const badgeOnUser = await prisma.badgesOnUsers.findUnique({
    where: {
      userId_badgeId: { userId, badgeId },
    },
  });
  if (!badgeOnUser) {
    //if the join table whose tier is being checked doesn't exist, initialize it
    await prisma.badgesOnUsers.create({
      data: {
        user: { connect: { id: userId } },
        badge: { connect: { id: badgeId } },
        counter: 1,
      },
    });
  } else {
    if (badge && badgeOnUser) {
      const currentCount = badgeOnUser.counter; //get the current count for this join table
      const currentTier = badge.tier; //get the current tier for the badge in question
      let newTier = currentTier;
      for (let key in tiers) {
        if (currentCount === tiers[key] && currentTier !== parseInt(key)) {
          newTier!++;
        }
      }
      //if a higher tier level exists
      if (badge.tier !== newTier!) {
        //find badge of the appropriate tier
        const higherTierBadge = await prisma.badge.findFirst({
          where: {
            name: badge.name,
            tier: newTier,
          },
        });
        if (higherTierBadge) {
          await prisma.badgesOnUsers.delete({
            where: {
              userId_badgeId: { userId, badgeId },
            },
          });

          //add new tier of badge
          await prisma.badgesOnUsers.create({
            data: {
              user: { connect: { id: userId } },
              badge: { connect: { id: higherTierBadge.id } },
              counter: currentCount,
            },
          });
        }
        //delete current tier of badge
      }
    }
  }
  res.sendStatus(201);
});

badgeRouter.post('/add', async (req, res) => {
  const { userId, badgeId } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    console.error(`could not find user with id ${userId}`);
    res.sendStatus(500);
  }
  const badge = await prisma.badge.findUnique({
    where: {
      id: badgeId,
    },
  });
  if (!badge) {
    console.error(`could not find badge with id ${badgeId}`);
    res.sendStatus(500);
  }
  await prisma.badgesOnUsers.create({
    data: {
      user: { connect: { id: userId } },
      badge: { connect: { id: badgeId } },
    },
  });
  res.sendStatus(201);
});

badgeRouter.patch('/counter', async (req: Request, res: Response) => {
  try {
    const { userId, badgeId, change } = req.body;
    let user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      console.error('an error occurred trying to find user with id ', userId);
      res.sendStatus(500);
    }
    const badgeOnUser = await prisma.badgesOnUsers.findUnique({
      where: {
        userId_badgeId: { userId, badgeId },
      },
    });
    if (!badgeOnUser) {
      if (change) {
        await prisma.badgesOnUsers.create({
          data: {
            user: { connect: { id: userId } },
            badge: { connect: { id: badgeId } },
            counter: change,
          },
        });
      }
    } else {
      let currentValue = badgeOnUser.counter;
      const updateCounter = await prisma.badgesOnUsers.update({
        where: {
          userId_badgeId: { userId, badgeId },
        },
        data: {
          counter: currentValue! + 1,
        },
      });
      res.status(200).send(updateCounter);
    }
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
  try {
    await prisma.badge.deleteMany({});
  } catch (err) {
    console.error('there was an error deleting old badges ', err);
  }
  for (let i = 0; i < badgesSeed.length; i++) {
    try {
      await prisma.badge.create({
        data: {
          name: badgesSeed[i].name,
          badgeIcon: badgesSeed[i].badgeIcon,
        },
      });
    } catch (err) {
      console.error('there was an error seeding badges ', err);
    }
  }
}

seedBadges()
  .catch((err) => console.error('an error occurred when seeding Badges: ', err))
  .finally(() => prisma.$disconnect()); //unsure if this part is necessary?

export { badgeRouter };
