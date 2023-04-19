import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

// Request Handlers //
const BikeRoutes = Router();
const prisma = new PrismaClient();

BikeRoutes.post('/newRoute', (req, res): void => {
  console.log(req);
});

export default BikeRoutes;
