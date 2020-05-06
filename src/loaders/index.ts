import express from 'express';
import { Server } from 'http';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import socketioLoader from './socketio';

export default async ({ app } : {app: express.Application}): Promise<Server> => {
  await mongooseLoader();

  const server = await expressLoader({ app });

  await socketioLoader(server);

  return server;
};
