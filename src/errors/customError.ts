export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(mesage: string) {
    super(mesage);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { mesage: string; field?: string }[];
}
