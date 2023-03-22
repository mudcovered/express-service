export class HttpError extends Error {
  private readonly status: number;
  public readonly additionalInfo?: unknown;
  public constructor(
    status: number,
    message: string,
    additionalInfo?: unknown
  ) {
    super(message);
    this.status = status;
    this.additionalInfo = additionalInfo;
  }

  public getStatus(): number {
    return this.status;
  }
}
