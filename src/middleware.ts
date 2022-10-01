import { NextFunction, Request, Response } from 'express';
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
