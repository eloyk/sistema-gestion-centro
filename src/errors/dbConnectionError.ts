import { CustomError } from './customError';

export class DBConnectionError extends CustomError {
  statusCode = 500;
  Reason = 'Error al intentar conectar a la base de datos';

  constructor() {
    super('Error al intentar conectarse a la db');

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors() {
    return [{ mesage: this.Reason }];
  }
}
