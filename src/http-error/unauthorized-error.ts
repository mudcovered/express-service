import { HttpError } from './http-error';

export class UnauthorizedError extends HttpError {
  public constructor(message: string) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}
