import { NextFunction, Request, Response } from 'express';
import { HttpError } from './http-error';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let status = 500;
  if (err instanceof HttpError) {
    status = err.getStatus();
  }

  if (err.name === 'PayloadTooLargeError') {
    // Express payload too large.
    status = 413;
  }
  res.locals.logger.error(
    `${req.method} ${status} ${req.path}: ${err.message}`
  );
  if (status === 500) {
    res.locals.logger.debug(err);
  }
  if (res.headersSent) {
    next(err);
  }
  if (req.method.toUpperCase() === 'HEAD') {
    res.set('X-Error', err.message);
    res.status(status);
  } else {
    if (err instanceof HttpError) {
      res.status(status).json({
        message: err.message,
        ...(err.additionalInfo ? { additionalInfo: err.additionalInfo } : {}),
      });
    } else {
      res.status(status).json({ message: err.message });
    }
  }
}
