import { CustomError } from './customError';

export class IncorrectRequest extends CustomError {
  statusCode = 400;

  constructor(public mesage: string) {
    super(mesage);

    Object.setPrototypeOf(this, IncorrectRequest.prototype);
  }

  serializeErrors() {
    return [{ mesage: this.mesage }];
  }
}
