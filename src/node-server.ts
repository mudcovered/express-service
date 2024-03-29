import * as BodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import { createServer, Server } from 'http';
import { errorMiddleware } from './error-middleware';
import { NotFoundError } from './http-error';
import { logMiddleware } from './log-middleware';

export interface ServerLogger {
  debug: (data: any, ...args: any[]) => void;
  error: (data: any, ...args: any[]) => void;
  info: (data: any, ...args: any[]) => void;
  warn: (data: any, ...args: any[]) => void;
}

export interface ServerOptions {
  port?: number;
  requestLimit?: string;
  logRequests?: boolean;
  jsonBody?: boolean;
  urlEncodedBody?: boolean;
  textBody?: boolean;
  logger?: ServerLogger;
}

export class NodeServer {
  private express: Express;
  private server?: Server;
  private logger: ServerLogger;
  public constructor(private options: ServerOptions) {
    this.express = express();
    if (!this.options.port) {
      this.options.port = 80;
    }
    if (this.options.logger) {
      this.logger = this.options.logger;
    } else {
      this.logger = console;
    }
    this.express.set('port', options.port);
  }

  public async initialise(
    initialiseRoutes: (_: Express) => Promise<void>
  ): Promise<void> {
    this.server = createServer(this.express);
    this.express.use((_req: Request, res: Response, next: NextFunction) => {
      res.locals.logger = this.options.logger ?? console;
      next();
    });
    // Security. Don't publicise the fact this is a node express server.
    this.express.disable('x-powered-by');

    if (this.options.jsonBody) {
      this.express.use(
        BodyParser.json(
          this.options.requestLimit ? { limit: this.options.requestLimit } : {}
        )
      );
    }
    if (this.options.urlEncodedBody) {
      this.express.use(
        BodyParser.urlencoded({
          extended: true,
          ...(this.options.requestLimit
            ? { limit: this.options.requestLimit }
            : {}),
        })
      );
    }
    if (this.options.textBody) {
      this.express.use(
        BodyParser.text({
          ...(this.options.requestLimit
            ? { limit: this.options.requestLimit }
            : {}),
        })
      );
    }

    this.express.use((_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    if (this.options.logRequests) {
      this.express.use(logMiddleware);
    }
    await initialiseRoutes(this.express);

    this.express.all('/*', (_req: Request, _res: Response) => {
      throw new NotFoundError('Not found');
    });
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    if (this.server) {
      this.server.listen(this.options.port);
      this.server.on('error', (error) => this.onError(error));
      this.server.on('listening', () => this.onListening());
    }
  }

  public stop(): void {
    delete this.server;
  }

  private onError(error: any): void {
    switch (error.code) {
      case 'EACCES':
        this.logger.error(
          `Port ${this.options.port} requires elevated privileges`
        );
        process.exit(1);
      // fallthrough: Actually unreachable
      case 'EADDRINUSE':
        this.logger.error(`Port ${this.options.port} already in use`);
        process.exit(1);
      // fallthrough: Actually unreachable
      default:
        console.error(error);
        process.exit(1);
      // fallthrough: Actually unreachable
    }
  }
  private onListening(): void {
    this.logger.info(`Listening on port ${this.options.port}`);
  }
}
