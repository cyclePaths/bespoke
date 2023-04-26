import { Router, Request, Response } from 'express';
import { PrismaClient, User, Badge, BadgesOnUsers } from '@prisma/client';

const badgeRouter = Router();
const prisma = new PrismaClient();

export { badgeRouter };
