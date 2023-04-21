import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

// Request Handlers //
const BikeRoutes = Router();
const prisma = new PrismaClient();

BikeRoutes.post('/newRoute', (req, res) => {
  const { request } = req.body;
  // const { id } = req.user;
  console.log(req.user);
});

export default BikeRoutes;
