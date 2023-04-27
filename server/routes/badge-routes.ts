import { Router, Request, Response } from 'express';
import { PrismaClient, User, Badge, BadgesOnUsers } from '@prisma/client';

const badgeRouter = Router();
const prisma = new PrismaClient();

badgeRouter.patch('/counter', async (req: Request, res: Response) => {
  try {
    const { userId, key, change } = req.body;
    let dataObj = {};
    dataObj[key] = change; //this should actually be 'current value' + change; need add a method to find the current value of this key!
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

export { badgeRouter };
