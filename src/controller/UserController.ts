import express, { Router } from 'express';
import { Container } from 'typedi';

import UserService from '../service/UserService';
import { loginMiddleware, authMiddleware } from '../security';


const userRouter: Router = express.Router();
const userService: UserService = Container.get(UserService);

userRouter.post('/user', async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.status(200).send();
  } catch (e) {
    res.status(400)
      .send(e.message);
  }
});

userRouter.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await userService.getPopulatedUser(req.user);
    res
      .status(200)
      .send(user);
  } catch (e) {
    res.status(e.statusCode || 500)
      .send(e.message);
  }
});

userRouter.post('/login', loginMiddleware);

export default userRouter;
