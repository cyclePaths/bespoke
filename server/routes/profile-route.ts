
import express, { Router } from 'express';
const profileRouter: Router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import {User} from 'schema.prisma';

profileRouter.get('/user', (req, res) => {

})


profileRouter.get('/calories', (req, res) => {
console.log(req.body)
})


profileRouter.post('/weight', (req, res) => {


})
