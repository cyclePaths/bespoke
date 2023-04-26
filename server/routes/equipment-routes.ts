import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const equipmentRouter = Router();
const prisma = new PrismaClient();

interface CreateEquipment {
    equipmentDescription: string,
    equipmentType: string;
    imgUrl: string;
    bulletinId: number;
}

equipmentRouter.get('/', (req, res) => {
    prisma.bulletin
      .findMany()
      .then((equipment) => res.status(200).send(equipment))
      .catch(() => {
        console.log('Failed to GET EQUIPMENT');
        res.sendStatus(500);
      });
  });

  equipmentRouter.post('/', (req, res) => {
    const { equipmentDescription, equipmentType, imgUrl, bulletinId } = req.body;
    const newEquipment: CreateEquipment = {
      equipmentDescription: equipmentDescription,
      equipmentType: equipmentType,
      imgUrl: imgUrl,
      bulletinId: bulletinId,
    };
    prisma.equipment
      .create({ data: newEquipment })
      .then((equipment) => res.status(201).send(equipment))
      .catch(() => {
        console.log('Failed to POST new BULLETIN');
        res.sendStatus(500);
      });
  });

