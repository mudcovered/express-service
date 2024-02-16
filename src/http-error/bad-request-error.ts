import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
  public constructor(message: string, additionalInfo?: unknown) {
    super(400, message, additionalInfo);
    this.name = 'BadRequestError';
  }
}
