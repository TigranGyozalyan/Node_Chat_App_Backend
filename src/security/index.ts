import { Container } from 'typedi';
import express, { NextFunction, Request, Response } from 'express';
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
      .header('Authorization', `Bearer ${jwtToken}`)
      .send();
  } catch (e) {
    res
      .status(e.statusCode)
      .send(e.message);
  }
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (token) {
    try {
      req.user = jwtService.validateToken(token);
      next();
    } catch (e) {
      res
        .status(e.statusCode)
        .send(e.message);
    }
  } else {
    res
      .status(403)
      .send();
  }
};
