import { Router, Request, Response } from 'express';
import {
  Prisma,
  PrismaClient,
  User,
  Badge,
  BadgesOnUsers,
} from '@prisma/client';
import { identity } from 'rxjs';
const badgeRouter = Router();
const prisma = new PrismaClient();

//returns an array of ALL badge objects
badgeRouter.get('/all-badges', async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const userId = id;
  try {
    const allBadges = await prisma.badge.findMany({});
    const badgesOnUser = await prisma.badgesOnUsers.findMany({
      where: {
        userId: userId,
      },
    });
    const badgeIds = badgesOnUser.map((ele) => {
      return ele.badgeId;
    });
    //extracts all badges who have the same IDs as the ones from the join table (meaning the user has earned them)
    const earnedBadges = allBadges.filter((ele) => {
      if (badgeIds.includes(ele.id)) {
        return true;
      } else {
        return false;
      }
    });
    let outp = {
      allBadges: allBadges,
      earnedBadges: earnedBadges,
      joinTableBadges: badgesOnUser,
    };
    res.status(200).send(outp);
  } catch (err) {
    console.error('an error occurred when GETting all badges', err);
    res.sendStatus(500);
  }
});

//Function to send the URL for the badge the user has selected back to the client to display
badgeRouter.get('/selected-badge', async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      console.error('could not find user in database');
      res.sendStatus(404);
    } else {
      res.send(user.selectedBadge).status(200);
    }
  } catch (err) {
    console.error(
      "an error has occurred GETting the user's selected badge icon: ",
      err
    );
    res.sendStatus(500);
  }
});

//Checks to see if badge tier should update, and if so, deletes current tier's join table entry and adds next one (defunct)
// badgeRouter.post('/tier', async (req: Request, res: Response) => {
//   const { id } = req.user as User;
//   const userId = id;
//   const { badgeId, tiers } = req.body;
//   try {
//     //get user from db
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });
//     //if user not in db, throw error
//     if (!user) {
//       console.error(`could not find user with id ${userId} in the database`);
//       res.sendStatus(500);
//     }
//     //find badge with the id that was sent
//     const badge = await prisma.badge.findUnique({
//       where: {
//         id: badgeId,
//       },
//     });
//     //if no badge with that id, throw error
//     if (!badge) {
//       console.error(`could not find badge with id ${badgeId}`);
//       res.sendStatus(500);
//     }
//     let tier = badge?.tier;
//     let tierUp = false;
//     //find the join table entry for the user and badge
//     const badgeOnUser = await prisma.badgesOnUsers.findUnique({
//       where: {
//         userId_badgeId: { userId, badgeId },
//       },
//     });
//     //if the join table whose tier is being checked doesn't exist:
//     if (!badgeOnUser) {
//       //initialize it?
//       // await prisma.badgesOnUsers.create({
//       //   data: {
//       //     user: { connect: { id: userId } },
//       //     badge: { connect: { id: badgeId } },
//       //     counter: 1,
//       //   },
//       // });
//       //I think it should just error out instead?
//       res.sendStatus(404);
//     } else if (badge && badgeOnUser && badgeOnUser.counter && badge.tier) {
//       const currentCount = badgeOnUser.counter; //get the current count for this join table
//       const currentTier = badge.tier; //get the current tier for the badge in question
//       let newTier = currentTier;
//       for (let key in tiers) {
//         //if the current count (presumably after an update, when this would be firing) is now equal to or greater than the threshold to tier up (and that tier up wouldn't be to the current tier)
//         if (currentCount >= tiers[key] && currentTier !== parseInt(key)) {
//           newTier++;
//         }
//       }
//       //if newTier has been changed
//       if (badge.tier !== newTier) {
//         tier = newTier;
//         tierUp = true;
//         //find badge of the appropriate tier
//         const higherTierBadge = await prisma.badge.findFirst({
//           where: {
//             name: badge.name,
//             tier: newTier,
//           },
//         });
//         //delete current tier of badge
//         if (higherTierBadge) {
//           await prisma.badgesOnUsers.delete({
//             where: {
//               userId_badgeId: { userId, badgeId },
//             },
//           });

//           //add new tier of badge
//           await prisma.badgesOnUsers.create({
//             data: {
//               user: { connect: { id: userId } },
//               badge: { connect: { id: higherTierBadge.id } },
//               counter: currentCount,
//             },
//           });
//         }
//       }
//     }
//     let responseData = {
//       tierUp: tierUp,
//       tier: tier,
//     };
//     res.send(responseData).status(201);
//   } catch (err) {
//     console.error(
//       `an error occurred when attempting to check/update the tier of badge with id ${badgeId} for user with id ${userId}`,
//       err
//     );
//     res.sendStatus(500);
//   }
// });

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
    if (badge && user) {
      await prisma.badgesOnUsers.create({
        data: {
          user: { connect: { id: userId } },
          badge: { connect: { id: badgeId } },
          counter: 0,
        },
      });
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(
      `an error occurred when attempting to add new badge with id ${badgeId} to user with id ${userId}`,
      err
    );
    res.sendStatus(500);
  }
});

badgeRouter.delete('/delete-badge', async (req, res) => {
  const { badgeId } = req.body;
  const { id } = req.user as User;
  const userId = id;
  try {
    await prisma.badgesOnUsers.delete({
      where: {
        userId_badgeId: { userId, badgeId },
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(
      `an error occurred when attempting to delete badge with badge ID ${badgeId} from user with ID ${userId}`
    );
    res.sendStatus(500);
  }
});

//increment or decrement counter for badge on join table (defunct)
// badgeRouter.patch('/counter', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.user as User;
//     const userId = id;
//     const { badgeId, change } = req.body;
//     let user: User | null = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });
//     if (!user) {
//       console.error(
//         `an error occurred trying to find user with id ${userId}; no user with that id exists in the database`
//       );
//       res.sendStatus(500);
//     }
//     const badgeOnUser = await prisma.badgesOnUsers.findUnique({
//       where: {
//         userId_badgeId: { userId, badgeId },
//       },
//     });
//     if (!badgeOnUser) {
//       if (change) {
//         const newBadge = await prisma.badgesOnUsers.create({
//           data: {
//             user: { connect: { id: userId } },
//             badge: { connect: { id: badgeId } },
//             counter: change,
//           },
//         });
//         res.status(201).send(newBadge);
//       } else {
//         res.sendStatus(404); //I assume 404 is the correct status code, since the badge to be downticked wasn't found?
//       }
//     } else {
//       let currentValue = badgeOnUser.counter;
//       if (currentValue === null || currentValue === undefined) {
//         currentValue = 0;
//       }
//       const newValue = currentValue + change;
//       const updateCounter = await prisma.badgesOnUsers.update({
//         where: {
//           userId_badgeId: { userId, badgeId },
//         },
//         data: {
//           counter: newValue,
//         },
//       });
//       res.status(200).send(updateCounter);
//     }
//   } catch (err) {
//     console.error(
//       `an error occurred when attempting to update ${req.body.key}`,
//       err
//     );
//     res.sendStatus(500);
//   }
// });

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

//seeder function for Badges

export { badgeRouter };
