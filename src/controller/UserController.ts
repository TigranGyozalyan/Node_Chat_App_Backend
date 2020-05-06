import express, { Router } from 'express';

const userRouter: Router = express.Router();

userRouter.post('/user', (req, res) => {
  console.log(req.body);
});

export default userRouter;
