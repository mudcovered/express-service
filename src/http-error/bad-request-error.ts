import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
  public constructor(message: string) {
    super(400, message);
  }
}
