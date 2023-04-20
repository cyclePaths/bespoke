
import express, { Router } from 'express';
const router: Router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import {User} from 'schema.prisma';

router.get('/user', (req, res) => {

})


router.get('/calories', (req, res) => {
console.log(req.body)
})


router.post('/weight', (req, res) => {


})
