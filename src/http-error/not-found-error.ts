import { HttpError } from './http-error';

export class NotFoundError extends HttpError {
  public constructor(message?: string) {
    super(404, message ?? 'Not found');
    this.name = 'NotFoundError';
  }
}
