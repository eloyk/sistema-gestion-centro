import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class ErrorValidationRequest extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Parametros de la solicitud invalidos');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ErrorValidationRequest.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { mesage: err.msg, field: err.param };
    });
  }
}
