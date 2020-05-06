import * as http from 'http';
import express from 'express';
import userRouter from '../controller/UserController';

export default async ({ app }: { app: express.Application }) => {
  app.use(express.json());

  app.get('/', (req, res): void => {
    res.send('Hello World');
  });

  app.use(userRouter);

  return http.createServer(app);
};
