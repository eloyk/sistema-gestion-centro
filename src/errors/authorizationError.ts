import { CustomError } from './customError';

export class AuthorizationError extends CustomError {
  statusCode = 401;

  constructor() {
    super('no posee autorizacion');

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors() {
    return [{ mesage: 'no posee autorizacion' }];
  }
}
