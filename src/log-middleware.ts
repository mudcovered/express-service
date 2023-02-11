import { NextFunction, Request, Response } from 'express';

export function logMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const contentType = req.get('Content-Type') ?? '';
  const contentLength = req.get('Content-Length') ?? '';
  console.info(`${req.method} ${req.path}: ${contentType} ${contentLength}`);
  next();
}
