export class HttpError extends Error {
  private readonly status: number;
  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  public getStatus(): number {
    return this.status;
  }
}
