import express, { Router } from 'express';
import { Container } from 'typedi';

import UserService from '../service/UserService';

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

export default userRouter;
