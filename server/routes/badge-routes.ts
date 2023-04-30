import { Router, Request, Response } from 'express';
import {
  Prisma,
  PrismaClient,
  User,
  Badge,
  BadgesOnUsers,
} from '@prisma/client';
import { badgesSeed } from '../server-assets';
import { identity } from 'rxjs';
const badgeRouter = Router();
const prisma = new PrismaClient();

//returns array of badge objects
badgeRouter.get('/badge-icons', async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const userId = id;
  try {
    const badgesOnUser = await prisma.badgesOnUsers.findMany({
      where: {
        userId: userId,
      },
    });
    const badgeIds = badgesOnUser.map((ele) => {
      return ele.badgeId;
    });
    let badges: Badge[] = [];
    badgeIds.forEach(async (ele) => {
      try {
        const badge = await prisma.badge.findUnique({
          where: {
            id: ele,
          },
        });
        if (badge) {
          badges.push(badge);
        }
      } catch (err) {
        console.error(
          `an error occurred when GETting badge with id ${ele} for user with id ${userId}`,
          err
        );
        res.sendStatus(500);
      }
    });
    res.status(200).send(badges);
  } catch (err) {
    console.error(
      `an error occurred when GETting badges for user with id ${userId}`,
      err
    );
    res.sendStatus(500);
  }
});

//Checks to see if badge tier should update, and if so, deletes current tier's join table entry and adds next one

badgeRouter.post('/tier', async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const userId = id;
  const { badgeId, tiers } = req.body;
  try {
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
        id: userId,
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
          //delete current tier of badge
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
        }
      }
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(
      `an error occurred when attempting to check/update the tier of badge with id ${badgeId} for user with id ${userId}`,
      err
    );
    res.sendStatus(500);
  }
});

//Add new badge to User via join table - Achievement Get!

badgeRouter.post('/add', async (req, res) => {
  const { id } = req.user as User;
  const userId = id;
  const { badgeId } = req.body;
  try {
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
  } catch (err) {
    console.error(
      `an error occurred when attempting to add new badge with id ${badgeId} to user with id ${userId}`,
      err
    );
    res.sendStatus(500);
  }
});

//increment or decrement counter for badge on join table

badgeRouter.patch('/counter', async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const userId = id;
    const { badgeId, change } = req.body;
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

//update displayed badge URL on User

badgeRouter.patch('/set', async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const { iconURL } = req.body;
  try {
    const updateBadge = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        selectedBadge: iconURL,
      },
    });
    res.status(201).send(updateBadge);
  } catch (err) {
    console.error(
      `an error has occurred while trying to update user with id ${id} to prefer badge with url ${iconURL}`
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
