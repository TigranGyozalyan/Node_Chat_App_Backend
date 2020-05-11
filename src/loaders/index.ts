import express from 'express';
import { Server } from 'http';
import mongooseLoader from './mongooseLoader';
import expressLoader from './expressLoader';
import socketioLoader from './socketioLoader';

export default async ({ app } : {app: express.Application}): Promise<Server> => {
  await mongooseLoader();

  const server = await expressLoader({ app });

  await socketioLoader(server);

  return server;
};
