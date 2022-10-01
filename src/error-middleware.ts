import { NextFunction, Request, Response } from 'express';
import { HttpError } from './http-error';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

type SyncHandler = (req: Request, res: Response, next: NextFunction) => void;

export function asyncHandle(f: AsyncHandler): SyncHandler {
  return (req, res, next): void => {
    f(req, res, next).catch(next);
  };
}

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

  console.error(`${req.method} ${status} ${req.path}: ${err.message}`);
  if (res.headersSent) {
    next(err);
  }
  if (req.method.toUpperCase() === 'HEAD') {
    res.set('X-Error', err.message);
    res.status(status);
  } else {
    res.status(status).json({ message: err.message });
  }
}
