
import express, { Router } from 'express';
const profileRouter: Router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';

profileRouter.get('/user', (req, res) => {
  console.log(req)
  res.send('hello world')
  // try {
  //   const userName = await prisma.user.findUnique({
  //     where: {
  //       email:
  //     }
  //   })
  // }
})


profileRouter.get('/calories', (req, res) => {
console.log(req.body)
})


profileRouter.post('/weight', (req, res) => {
console.log(req.body)

//User prisma upsert to find user by id or email
//this will allow us to create new weight if one doesn't exist
//or update an existing weight

})

export default profileRouter;
