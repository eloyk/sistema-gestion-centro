import { CustomError } from './customError';

export class ErrorNotFound extends CustomError {
  statusCode = 404;

  constructor() {
    super('Pagina no encotrada');

    Object.setPrototypeOf(this, ErrorNotFound.prototype);
  }

  serializeErrors() {
    return [{ mesage: 'Pagina no encontrada' }];
  }
}
