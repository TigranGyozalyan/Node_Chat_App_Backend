import * as http from 'http';
import express from 'express';
import userRouter from '../controller/UserController';
import roomRouter from '../controller/RoomController';

export default async ({ app }: { app: express.Application }) => {
  app.use(express.json());

  app.get('/', (req, res): void => {
    res.send('Hello World');
  });

  app.use(userRouter);
  app.use(roomRouter);

  return http.createServer(app);
};
