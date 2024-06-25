import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors/authorizationError';
import config from '../config/config'
import jwt from 'jsonwebtoken';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    jwt.verify(
      `${req.header('authorization')}`,
      `-----BEGIN PUBLIC KEY-----\n${config.KEYCLOAK.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
      {
        algorithms: ["RS256"]
      });
  
  } catch (e) {
    console.log(`${e}`)
    throw new AuthorizationError();
  }

  next();
};