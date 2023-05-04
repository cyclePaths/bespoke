import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const equipmentRouter = Router();
const prisma = new PrismaClient();

interface CreateEquipment {
  equipmentOrigin: string;
  equipmentDescription: string;
  equipmentType: string;
  imgUrl?: string;
  bulletinId?: number;
}

equipmentRouter.get('/', (req, res) => {
  prisma.equipment
    .findMany()
    .then((equipment) => res.status(200).send(equipment))
    .catch(() => {
      console.error('Failed to GET EQUIPMENT');
      res.sendStatus(500);
    });
});

equipmentRouter.post('/', (req, res) => {
  const {
    equipmentOrigin,
    equipmentDescription,
    equipmentType,
    bulletinId,
    imgUrl,
  } = req.body;
  const newEquipment: CreateEquipment = {
    equipmentOrigin: equipmentOrigin,
    equipmentDescription: equipmentDescription,
    equipmentType: equipmentType,
    imgUrl: imgUrl,
    bulletinId: bulletinId,
  };
  prisma.equipment
    .create({ data: newEquipment })
    .then((equipment) => res.status(201).send(equipment))
    .catch(() => {
      console.error('Failed to POST new EQUIPMENT');
      res.sendStatus(500);
    });
});

export default equipmentRouter;
