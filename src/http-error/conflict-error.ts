import { HttpError } from './http-error';

export class ConflictError extends HttpError {
  public constructor(message: string) {
    super(409, message);
    this.name = 'ConflictError';
  }
}
