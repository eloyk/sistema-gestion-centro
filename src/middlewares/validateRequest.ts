import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorValidationRequest } from '../errors/errorValidationRequest';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ErrorValidationRequest(errors.array());
  }

  next();
};
