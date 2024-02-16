import { HttpError } from './http-error';

export class ForbiddenError extends HttpError {
  public constructor(message: string) {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}
