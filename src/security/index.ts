import { Container } from 'typedi';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import UserService from '../service/UserService';
import { UserPrincipal } from '../domain/dto/UserPrincipal';
import EncryptionUtil from '../util/EncryptionUtil';
import JWTService from '../service/JWTService';


const userService: UserService = Container.get(UserService);
const jwtService: JWTService = Container.get(JWTService);

export const loginMiddleware = async (req: express.Request, res: express.Response) => {
  const principal = req.body as UserPrincipal;
  principal.password = EncryptionUtil.encrypt(principal.password);
  try {
    const user = await userService.getUserByCredentials(principal);
    const jwtToken = jwtService.generateToken(user);
    res
      .status(200)
      .header('Authorization', jwtToken)
      .send();
  } catch (e) {
    res
      .status(e.statusCode)
      .send(e.message);
  }
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header('Authorization');
  if (token) {
    token = token.replace('Bearer ', '');
    try {
      req.user = jwtService.validateToken(token);
      next();
    } catch (e) {
      res
        .status(403)
        .send(e.message);
    }
  } else {
    res
      .status(403)
      .send();
  }
};

export const logOutMiddleware = (req: Request, res: Response) => {
  req.user = '';
  res
    .status(200)
    .send();
};

export const corsConfig: cors.CorsOptions = {
  origin: '*',
  allowedHeaders: [
    'Authorization', 'Access-Control-Allow-Origin', 'Content-Type', 'Cache-Control', 'X-Requested-With',
  ],
  credentials: true,
  exposedHeaders: [
    'Content-Disposition', 'Location', 'Authorization',
  ],
  methods: [
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE',
  ],
};
