import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import { SchoolService } from '../services/school';
const service = new SchoolService()

interface UserPayload {
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('authorization')) {
    return next();
  }
  try {
    const currentUser = jwt.verify(
      `${req.header('authorization')}`,
      `-----BEGIN PUBLIC KEY-----\n${config.KEYCLOAK.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
      {
        algorithms: ["RS256"]
      }) as any;

    const school = await service.getSchoolByClientId(currentUser.azp) as any
    req.currentUser = { ...currentUser, schoolCode: school.id };

  } catch (err) { }

  next();
};

